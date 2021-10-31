Mutation Observer 有以下特点。
- Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。
- 它等待所有脚本任务完成后，才会运行（即异步触发方式）。
- 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。
- 它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。


```js
var observer = new MutationObserver(callback);

var article = document.querySelector('article');

var  options = {
  'childList': true,
  'attributes':true
} ;

observer.observe(article, options);
```
观察器所能观察的 DOM 变动类型（即上面代码的options对象），有以下几种。

- childList：子节点的变动（指新增，删除或者更改）。
- attributes：属性的变动。
- characterData：节点内容或节点文本的变动。


### requestAnimationFrame

是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。

设置这个API的目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。
代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

requestAnimationFrame是在主线程上完成。这意味着，如果主线程非常繁忙，requestAnimationFrame的动画效果会大打折扣。


```js
requestID = window.requestAnimationFrame(callback); 


 window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

// 上面的代码按照1秒钟60次（大约每16.7毫秒一次），来模拟requestAnimationFrame。
// 使用requestAnimationFrame的时候，只需反复调用它即可。

function repeatOften() {
  // Do whatever
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);
```

cancelAnimationFrame方法用于取消重绘。
```js
window.cancelAnimationFrame(requestID);
```


