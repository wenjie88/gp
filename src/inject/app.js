import "babel-polyfill";
import GP from './gp.js';
import * as GPServer from './gpServer.js';
import GPFilter from './gpfilter.js';
import $ from '../lib/jquery.min.js';


/**
 * 检测登录状态
 */
(function CheckLogin() {
    let LoginBtn = $("#top_left_bar a[class='login left_sub_elem']")[0]
    if (LoginBtn !== undefined) {
        //未登录, 需要登录
        LoginBtn.click()
    }
})()

/**
* 设置定时器
*/
setInterval(function () {
    var _d = new Date()
    var _hour = _d.getHours()
    var _min = _d.getMinutes()
    var timeStr = _hour + ':' + _min
    switch (timeStr) {
        case '14:30':
        case '15:0':
            foo()
            break;
        case '12:0':
            window.location.reload()
            break;
    }
}, 1000 * 60)



window.foo = async function () {
    var list = await GPServer.GetGpData();
    console.log(list)

    list = new GPFilter(list).chuangyeban()
                             .TotalDiefu('2%')
                             .f2('1.5%')
                             .valformat([':|.','|:.'])
                             .TotalHuanShou('2%')
                             .TotalDays(250)
                             .gplist
    
    
    // list = new GPFilter(list)
    //     .TotalDiefu("2.5%")
    //     .AboveJunXian_or("30||60||180", "1.5%")
    //     .chuangyeban()
    //     //.NearJunXian_and(["30", "60"],"1%")
    //     .gplist;

    // GPServer.AddZiXuan(list.map(item => { return item.code }))


    // console.log(new Date())
    console.log(list)

}



