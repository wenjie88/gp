import GP from "./gp.js"
import $ from './jquery.min.js'


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
export function GetGpData() {
    return  new Promise((resolve, reject) => {
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
            
            var GPList = result.map(item=>{
                return GP.CreateGP(item,title)
            })

            resolve(GPList);
        })
    })
}


export function AddZiXuan(stockcodes) {
    return new Promise((resolve, reject) => {
        $.post(URL_add_zixuan, { 'stockcodes[]': stockcodes }, (s) => {
            console.log(s);
        })
    })
}
