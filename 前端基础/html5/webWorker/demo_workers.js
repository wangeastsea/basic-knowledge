var i = 0;
/*由于 web worker 位于外部文件中，它们无法访问下列 JavaScript 对象：
window 对象
document 对象
parent 对象*/
function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()", 500);
}

timedCount();