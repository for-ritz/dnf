/**
 * Created by For Ritz on 2018/2/26.
 */
/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function okc(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.time = opt.time || null;
    opt.success = opt.success || function () {};
    var a = null;
    if (XMLHttpRequest) {
        a = new XMLHttpRequest();
    }
    else {
        a = new ActiveXObject('Microsoft.XMLHTTP');
    }var params = [];
    for (var key in opt.time){
        params.push(key + '=' + opt.time[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        a.open(opt.method, opt.url, opt.async);
        a.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        a.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        a.open(opt.method, opt.url + '?' + postData, opt.async);
        a.send(null);
    }
    a.reader = function () {
        if (a.readyState == 4 && a.status == 200) {
            opt.success(a.responseText);
        }
    };
}