/**
 *  注入js 到亚马逊登录页面， 监听登录按钮点击，获取登录帐号 
 */

// document.getElementById("signInSubmit").addEventListener('click', function () {
//     var UserAccount = document.getElementById('ap_email').value
//     var UserPwd = document.getElementById('ap_password').value
//     console.log(UserAccount, UserPwd)
//     //发送到插件
//     chrome.extension.sendRequest({ 'UserAccount': UserAccount, 'UserPwd': UserPwd })
// })


setInterval(function () {
    var _d = new Date()
    if (_d.getHours() === 14 && _d.getMinutes() == 30) {
        foo()
    } else if (_d.getHours() === 15 && _d.getMinutes() == 01) {
        foo()
    }

}, 1000 * 60)


async function foo() {
    var gp = new WJGP();

    //3天交易日的日期 赋值到参数中
    await gp.GetThreeDayAsync()

    //基础设置
    await gp.DefaultSettingAsync()

    //获取数据
    var gplist = await gp.LoadDataAsync()
    console.log(gplist)

    //精确处理
    var ok_gplist = gp.rule_filter(gplist)
    console.log(ok_gplist)

    //返回需要添加到自选的 所有codes
    var stockcodes = ok_gplist.map(item => {
        return item[0]
    })

    //添加自选
    await gp.add_zixuanAsync(stockcodes)

}


function WJGP() {
    var url_config = {
        search: "http://www.iwencai.com/stockpick/load-data",
        next_page: "http://www.iwencai.com/stockpick/cache",
        add_zixuan_url: "http://www.iwencai.com/stockpick/addselfstock",
        save_index_order_url: "http://www.iwencai.com/stockpick/save-index-order/"
    }

    var parmas = {
        ts: 1,
        f: 1,
        type: 0,
        qs: "result_original",
        tid: "stockpick",
        selfsectsn: "",
        querytype: "",
        searchfilter: "",
        queryarea: "",
        preParams: "",
        w: "连续3日下跌,创业板除外,st除外",
    }

    var token = ''

    this.GetThreeDayAsync = () => {
        return new Promise((resolve, reject) => {

            $.getJSON(url_config.search, parmas, (re) => {
                var res_data = re.data.result
                token = res_data.token     //token  再获取下一页的时候需要用到
                var title = (res_data.title[4])["涨跌幅:前复权(%)"]
                var day3 = title[0]
                var day2 = title[1]
                var day1 = title[2]
                parmas.w += `,${day2}的成交量>${day1}的成交量>${day3}的成交量`

                resolve()
            })
        })
    }


    //设置key的位置
    this.DefaultSettingAsync = () => {
        new Promise((resolve, reject) => {
            var data = {
                perpage: 70,
                token: token,
                showIndexId: "最新涨跌幅	最新价	涨跌幅:前复权	上市板块	成交量	{(}成交量{-}成交量{)}([1]-[2])	{(}成交量{-}成交量{)}([2]-[3])	开盘价:前复权	最高价:前复权	最低价:前复权	收盘价:前复权	振幅	涨跌	成交额	上市天数	a股市值(不含限售股)",
                showType: ["", "", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable"],
                sort: { "column": "4_0", "order": "DESC" }
            }
            $.post(url_config.save_index_order_url, data, (result) => {
                resolve()
            })
        })
    }



    this.LoadDataAsync = () => {
        return new Promise((resolve, reject) => {
            $.getJSON(url_config.search, parmas, (response) => {

                var dataResult = response.data.result
                token = dataResult.token     //token  再获取下一页的时候需要用到
                var total = dataResult.total     //总数
                var perpage = dataResult.perpage //每页多少条
                var page = dataResult.page       //第1页
                var result = response.data.result.result //所有列表

                //如果有下一页,无脑请求下一页
                var totalPage = Math.ceil(total / perpage)
                if (totalPage > 1) {
                    var promiseList = []
                    for (var i = 1; i < totalPage; i++) {
                        promiseList.push(LoadNextPage(token, page + i, perpage))
                    }

                    Promise.all(promiseList).then(resultArr => {
                        resultArr.forEach(item => {
                            result.push(...item)
                        })
                        resolve(result)
                    })
                } else {
                    resolve(result)
                }
            })
        })
    }



    //过滤，获取更加精确的数据
    this.rule_filter = (gplist) => {

        var ok_gplist = []

        for (var i in gplist) {
            var result = gplist[i]

            var code = result[0]; //002037.sz
            var name = result[1];
            var now_price = result[2];
            var now_precent = result[3];
            var region_percent_arr = result[4];//array 区间涨跌幅度(%)  日期由大至小 (11 10 9)
            var type_name = result[5];//中小板 主板
            var region_vol_arr = result[6]; //array 区间成交量 (股)
            var region_vol_ca_1 = result[7]  //区间一的成交量差额 (股)
            var region_vol_ca_2 = result[8]  //区间二的成交量差额 (股)
            var region_open_price_arr = result[9] //array 区间每日的开盘价
            var region_high_price_arr = result[10] //array 区间每日的最高价
            var region_low_price_arr = result[11] //array 区间每日的最低价
            var region_low_close_arr = result[12] //array 区间每日的收盘价
            var region_zhen_percent_arr = result[13]//array 区间每日的振幅 (%)
            var region_zhang_die_price_arr = result[14]//array 区间每日的涨跌 (元)
            var region_volPrice_arr = result[15] //array 区间每日的成交额(元)
            var tradeDays = result[16] //上市天数
            var circulation_market_value = result[17] //流通市值 (元)


            //具体规则
            //1. 三天跌幅小于2.5%的排除
            var sum_percent = 0
            region_percent_arr.forEach(num => {
                sum_percent += Number(num)
            })
            if (Math.abs(sum_percent) < 2.5) continue

            //2.上市天数小于1年的排除
            if (tradeDays < 250) continue

            //3. 第三天大阴的排除 (开盘价不能和收盘价差距大于1.8%)
            if (Math.abs(Number(region_percent_arr[0])) > 1.8) continue

            //4.第二日不是长实体阴的排除 (最高价-开盘价 < 开盘价-收盘价 && 收盘价-最低价 < 开盘价-收盘价 )
            var shangying_xian = Math.abs(Number(region_high_price_arr[1]) - Number(region_open_price_arr[1])) //上影
            var xiaying_xian = Math.abs(Number(region_low_price_arr[1]) - Number(region_low_close_arr[1])) //下影
            var shiti_xian = Math.abs(Number(region_open_price_arr[1]) - Number(region_low_close_arr[1])) //实体
            if (shangying_xian > shiti_xian) continue
            if (xiaying_xian > shiti_xian) continue


            ok_gplist.push(result)
        }


        return ok_gplist
    }



    //添加自选
    this.add_zixuanAsync = (stockcodes) => {
        return new Promise((resolve, reject) => {
            $.post(url_config.add_zixuan_url, { 'stockcodes[]': stockcodes }, (s) => {
                console.log(s)
            })
        })
    }



    //加载下一页数据
    function LoadNextPage(token, page, pageSize) {
        return new Promise((resolve, reject) => {
            var data = {
                token: token,
                p: page,
                perpage: pageSize,
                showType: ["", "", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable"]
            }
            $.getJSON(url_config.next_page, data, (respone) => {
                //console.log(respone.result)
                resolve(respone.result)
            })
        })
    }

}


