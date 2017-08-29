



function GPServer() {


    const URL_search = "http://www.iwencai.com/stockpick/load-data";
    const URL_next_page = "http://www.iwencai.com/stockpick/cache";
    const URL_add_zixuan = "http://www.iwencai.com/stockpick/addselfstock";
    const URL_save_index_order = "http://www.iwencai.com/stockpick/save-index-order/";




    //加载下一页数据
    function LoadNextPage(token, page, pageSize) {
        return new Promise((resolve, reject) => {
            var data = {
                token: token,
                p: page,
                perpage: pageSize,
                showType: ["", "", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable", "onTable"]
            }
            $.getJSON(URL_next_page, data, (respone) => {
                //console.log(respone.result)
                resolve(respone.result)
            })
        })
    }





    /**
     * @returns {GP[]} 
     */
    this.GetGpData = () => {
        return new Promise((resolve, reject) => {
            const Server_Parmas = {
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
                w: "连续下跌3日，3日成交量, 10日均线，20日均线，30日均线，60日均线，180日均线，250日均线",
            }


            $.getJSON(URL_search, Server_Parmas, (response) => {

                var dataResult = response.data.result
                var token = dataResult.token     //token  再获取下一页的时候需要用到
                var total = dataResult.total     //总数
                var perpage = dataResult.perpage //每页多少条
                var page = dataResult.page       //第1页
                var result = dataResult.result //所有列表
                var title = dataResult.title //所有列表标题

                //如果有下一页,无脑请求下一页
                //如果有下一页,无脑请求下一页
                var totalPage = Math.ceil(total / perpage);
                if (totalPage > 1) {
                    var promiseList = []
                    for (var i = 1; i < totalPage; i++) {
                        promiseList.push(LoadNextPage(token, page + i, perpage));
                    }

                    Promise.all(promiseList).then(resultArr => {
                        resultArr.forEach(item => {
                            result.push(...item);
                        });
                    });
                }

                var GPList = result.map(item => {
                    return GP.CreateGP(item, title)
                })

                resolve(GPList);
            })
        })
    }



    /**
     * 添加自选
     * @param {*} stockcodes
     */
    this.AddZiXuan = (stockcodes) => {
        return new Promise((resolve, reject) => {
            $.post(URL_add_zixuan, { 'stockcodes[]': stockcodes }, (s) => {
                console.log(s);
            })
        })
    }



}





function GP() {
    this.name = "";
    this.code = "";
    this.nowprice = "";
    this.UpDownPencent = "";
    this.UpDownPencentArr = [];
    this.VolPaperArr = [];
    this.OpenPriceArr = [];
    this.HighPriceArr = [];
    this.LowPriceArr = [];
    this.ClosePriceArr = [];
    this.ZhenFuPencentArr = [];
    this.UpDownPencentTotal = "";
    this.ZhenFuPencentTotal = "";
    this.UpDownMoneyTotal = "";
    this.VolPaperTotal = "";
    this.VolValTotal = "";
    this.jun_10 = "";
    this.jun_20 = "";
    this.jun_30 = "";
    this.jun_60 = "";
    this.jun_180 = "";
    this.jun_250 = "";
    this.SignBuy = "";
    this.LookLike = "";
    this.PE = "";
    this.PB = "";
    this.AllPaper = "";
    this.template = {
        "代码01": this.code,
        "代码02": this.name,
        "代码03": this.nowprice,
        "代码04": this.UpDownPencent,
        "代码05": this.UpDownPencentArr,
        "代码06": this.VolPaperArr,
        "代码07": this.OpenPriceArr,
        "代码08": this.HighPriceArr,
        "代码09": this.LowPriceArr,
        "代码10": this.ClosePriceArr,
        "代码11": this.ZhenFuPencentArr,
        "代码12": this.UpDownPencentTotal,
        "代码13": this.ZhenFuPencentTotal,
        "代码14": this.UpDownMoneyTotal,
        "代码15": this.VolPaperTotal,
        "代码16": this.VolValTotal,
        "代码17": this.jun_10,
        "代码18": this.jun_20,
        "代码19": this.jun_30,
        "代码20": this.jun_60,
        "代码21": this.jun_180,
        "代码22": this.jun_250,
        "代码23": this.SignBuy,
        "代码24": this.LookLike,
        "代码25": this.PE,
        "代码26": this.PB,
        "代码27": this.AllPaper
    }


    /**
     * 
     * @param {[]} item 
     * @param {[]} TitleList 
     * @returns {GP}
     */
    this.CreateGP = (item, TitleList) => {
        var gp = new GP();
        for (var i = 0; i < title.length; index++) {
            var _titleName = title[i]
            var PropertyName = ""
            if (typeof (_titleName) === 'string') {
                //PropertyName = gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "")];
                gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "")] = item[i]
            } else {
                for (var key in _titleName) {
                    gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "")] = item[i]
                    // PropertyName = gp.template[key.replace(/(<br>[\w|\.|\-]+)/, "")];
                }
            }
            // gp[PropertyName] = item[i];
        }
        return gp
    }
}