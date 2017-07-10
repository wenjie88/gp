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



var string = "http://www.iwencai.com/stockpick/load-data"
var add_zixuan_url = "http://www.iwencai.com/stockpick/addselfstock"
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
    w: "连续3日下跌",
}


setInterval(function(){
    var _d = new Date()
    if(_d.getHours() === 12 && _d.getMinutes() == 00){
        foo()
    }else if(_d.getHours() === 14 && _d.getMinutes() == 30){
        foo()
    }else if(_d.getHours() === 15 && _d.getMinutes() == 01){
        foo()
    }

},1000*60)


async function foo(){
    await getDays()

    var stockcodes = await getGp()

    await add_zixuan(stockcodes)
}


function getDays(){
    return new Promise((resolve, reject) => {
        $.getJSON(string, parmas, (re) => {
            var res_data = re.data.result
            var title = (res_data.title[4])["涨跌幅:前复权(%)"]
            var day3 = title[0]
            var day2 = title[1]
            var day1 = title[2]

            parmas.w += `,${day2}的成交量>${day1}的成交量>${day3}的成交量`

            resolve()
        })
    })
}


function getGp(){
    return new Promise((resolve, reject) => {
       $.getJSON(string, parmas, (response) => {
            var result = response.data.result.result
            console.log(result)

            var stockcodes = []
            result.forEach(item => {
                stockcodes.push(item[0])
            })

            resolve(stockcodes)
        })
    })
}

function add_zixuan(stockcodes){
    return new Promise((resolve,reject)=>{
        $.post(add_zixuan_url, { 'stockcodes[]': stockcodes }, (s) => {
                console.log(s)
        })
    })
}
