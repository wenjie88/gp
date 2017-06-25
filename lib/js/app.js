
var arr = []
var obj = {}
$(function () {

    $('#btn').click(function () {



        for (var i = 0; i < 40; i++) {
            var a = {
                page: i + 1,
                num: 100,
                sort: 'changepercent',
                asc: 1,
                node: 'hs_a',
                symbol: "",
                _s_r_a: 'page'
            }
            $.get("http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData", a, (result) => {
                try {
                    eval(result).forEach((item, index) => {
                        if (obj[item.name] == undefined) {
                            obj[item.name] = item
                            arr.push(item.name)
                        }
                    })
                } catch (ex) {
                    console.log(ex)
                }
            })

        }


    })

})

var o = {

    code: "002780",
    name: "三夫户外", 
    amount: 100942037, //成交量 (元)
    volum: 3663324,   //成交量 (股数)
    turnoverratio: 6.47329, //换手率
    changepercent: "6.208", //涨跌百分比
    trade: "28.400",      //最新价 
    open: "26.520",
    high: "28.660",
    low: "26.380",
    settlement: "26.740",  //昨日收
    buy: "28.390",     //买
    sell: "28.400",         //卖
    mktcap: 287445.74928,  // 总市值 (万)
    nmc: 160719.3914,      // 流通市值 (万)
    pb: 4.917,
    per: 54.615,
    pricechange: "1.660",
    symbol: "sz002780",
    ticktime: "15:05:03",
}