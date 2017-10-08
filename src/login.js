
/**
 * 登录
 */
window.Ex_Login = function () {

    let account = document.getElementsByClassName("account")[0]
    let pwd = document.getElementsByClassName("password")[0]

    account.value = '13750092066';
    pwd.value = '8864439q';


    setTimeout(function () {
        let login = document.getElementsByClassName('login')[0]
        login.click();
    }, 3000);
}


Ex_Login();
