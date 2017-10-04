import "babel-polyfill";
import GP from './gp.js';
import * as GPServer from './gpServer.js';
import GPFilter from './gpfilter.js';



window.foo = async function() {
    var list = await GPServer.GetGpData();
    console.log(list)
    list = new GPFilter(list)
        .TotalDiefu("2.5%")
        .AboveJunXian_or("30||60||180","1.5%")
        .chuangyeban()
        //.NearJunXian_and(["30", "60"],"1%")
        .gplist;

    GPServer.AddZiXuan(list.map(item => { return item.code }))
    // if(result.success == "false" && result.message == "have not login"){
    //     window.location.reload()
    // }

    console.log(new Date())
    console.log(list)
}

setInterval(function () {
    var _d = new Date()
    if (_d.getHours() === 14 && _d.getMinutes() == 30) {
        foo()
    } else if (_d.getHours() === 15 && _d.getMinutes() == 0) {
        foo()
    } else if(_d.getHours() == 9 && _d.getMinutes() == 0){
        window.location.reload()
    }

}, 1000 * 60)