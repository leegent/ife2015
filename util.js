/**
 * Created by mystery on 2016/3/6.
 */
var person={
    name:"test",
    age:20,
    city:"Shanghai",
    car:{
        brand:"Benz",
        wheels:4
    }
};

function showProp(obj) {
    for (var prop in obj) {
        if (typeof obj[prop] != "object") {
            document.write("PropertyName:" + prop + "  Value:" + obj[prop] + "<br>");
        }
        else showProp(obj[prop]);
    }
}

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn)=== '[object Function]';
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var des=new Object();
    var prop;
    for(prop in src){
        if (typeof src[prop] != "object") {
            des[prop]=src[prop];
        }
        else{
            des[prop]=cloneObject(src[prop]);
        }
    }
    return des;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var uniq=new Array();
    for(var i=0;i<arr.length;i++){
        if(uniq.indexOf(arr[i])==-1) uniq.push(arr[i]);
    }
    return uniq;
}

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var i= 0,j=str.length-1;
    while(str.substr(i,1)==" " || str.substr(i,1)=="\t") {
        i++;
    }
    while(str.substr(j,1)==" " || str.substr(j,1)=="\t"){
        j--;
    }
    return str.substring(i,j+1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g,"");
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var x in arr){
        fn(arr[x],x);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var i=0;
    for(var p in obj) i++;
    return i;
}


// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg=/(^\w+)@(\w+)\.(((\w|\.)*)\w$)/;
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg=/^1\d{10}$/;
    return reg.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element.className==null) element.className=newClassName;
    else element.className += " "+newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(element.className.indexOf(" ")!=-1) element.className = element.className.replace(" "+oldClassName,"");
    else element.className=null;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode==siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var pos=element.getBoundingClientRect();
    return {
        x:pos.left,
        y:pos.top
    }
}

// 实现一个简单的Query
function $(selector) {
    var invoker;
    if(this==window) invoker=document;
    var split=selector.split(" ");
    for(var i in split){
        switch (split[i].charAt(0)){
            case "#":
                invoker=invoker.getElementById(split[i].substring(1));
                break;
            case ".":
                invoker=invoker.getElementsByClassName(split[i].substring(1))[0];
                break;
            case "[":
                if(split[i].charAt(split[i].length-1)!="]") return null;
                var equalPos=split[i].indexOf("=");
                if(equalPos==split[i].length-2) return null;
                var nodes=invoker.getElementsByTagName("*");
                var j=0;
                if(equalPos==-1){
                    for(j;j<nodes.length;j++){
                        if(nodes[j].nodeType!=1) continue;
                        if(nodes[j].getAttribute(split[i].substring(1,split[i].length-1)) != null){
                            invoker=nodes[j];
                            break;
                        }
                    }
                }
                else{
                    var value=split[i].substring(equalPos+1,split[i].length-1);
                    var attrVal;
                    for(j;j<nodes.length;j++){
                        if(nodes[j].nodeType!=1) continue;
                        attrVal=nodes[j].getAttribute(split[i].substring(1,equalPos));
                        if(attrVal != null && attrVal==value){
                            invoker=nodes[j];
                            break;
                        }
                    }
                }
                if(j==nodes.length) invoker=null;
                break;
            default:
                invoker=invoker.getElementsByTagName(split[i])[0];
        }
    }
    return invoker;
}

// 可以通过id获取DOM对象，通过#标示，例如
var t1=$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
var t2=$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
var t3=$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
var t5=$("[data-log]"); // 返回第一个包含属性data-log的对象

var t6=$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
var t4=$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象