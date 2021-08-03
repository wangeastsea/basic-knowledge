### 节流与防抖

#### 防抖
防抖， 仅仅从字面去理解，就是防止抖动,关键点是等待，等待300ms,如果没有新的action，就执行。
这里举一个更形象的例子，也是使用此场景最多的例子。

有一个搜索输入框，为了提升用户体验，希望在用户输入后可以立即展现搜索结果，而不是每次输入完后还要点击搜索按钮。最基本的实现方式应该很容易想到，那就是绑定 input 元素的键盘事件，每次输入的时候，触发input，向后台发起请求。

类似于以下伪代码：
```js
const inputEle = document.querySelector('input')
async function search (e) {
    await getUser({name: e.targe.value})
}
inputEle.addEventListener('input', search)
```
但是这个时候，后端提出了一个问题，不希望用户每输入一个字符，就发起一次后端请求，这样会造成资源的浪费。例如每当用户输入一个字符，都会触发搜索，而实际上，只有最后一次搜索结果是用户想要的，前面进行了 2 次无效查询，浪费了网络带宽和服务器资源。
- 1: 'l'
- 2: 'li'
- 3: 'liu'

对于这类连续触发的事件，需要添加一个**“防抖”功能**，为函数的执行设置一个合理的时间间隔，避免事件在时间间隔内频繁触发，同时又保证用户输入后能即时看到搜索结果。

接下来，我们分析下如何实现一个简单版的的防抖
```js
function debounce (fn, wait = 0) {
  let timeout = null
  return function () {
    // 如果已经存在定时器，说明是在wait间隔之内触发的，需要重新计时
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    let self = this
    let args = Array.prototype.slice(arguments)
    timeout = setTimeout(() => {
      fn.call(self, ...args)
    }, wait)
  }
}
```
如果通过箭头函数，也可以这么写
```js
function debounce = (fn, wait = 0) => {
    let timeout = null
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        timeout = setTimeout(async () => {
            // 箭头函数里的this,指向定义时的上一层，没有自己的this
            await fn.apply(this, args)
        }, wait)
    }
}
```
通过这段代码，我们做测试和调试
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>截流与防抖</title></title>
    <script src="./debounce.js"></script>
</head>
<body>
    <div>
        <input type="text"> 请输入
    </div>
    <script>
        const inputEle = document.querySelector('input')
        async function search (e) {
            console.log(this)
            console.log('input==>', e.target.value)
        }
        inputEle.addEventListener('input', debounce(search, 200))
    </script>
</body>
</html>
```
接下来，我们实现一个豪华版的防抖

```js
const debounce = (func, await = 0) => {
  let timeout = null
  let args
  function dobounced(...arg) {
    args = arg
    if (timeout) {
      clearTimeout(timeouts)
      timeout = null
    }
    return new Promise((resolve, reject) => {
      timeout = setTimeout(async() => {
        try {
          const res = await func.apply(this, args)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      }, wait)
    })
  }
  // 允许取消
  function cancel() {
    clearTimeout(timeout)
    timeout = null
  }
  // 允许立即执行
  function flush() {
    cancel()
    return func.apply(this, args)
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

```

#### 节流
我们知道有个词语，叫做开源节流。这里的节流是省着消费。而我们JS里的节流，也用相同的意义，减少没有必要的dom操作，因为dom操作是昂贵的。节流的关键词是丢弃， 500ms内只执行一次，其余的action 被丢弃。打一个生活中的比喻就是：我脑海里无时无刻都有购物的想法，但是要省钱，就必须节制购物，给自己定下规则，3个月内只能买一次物品。当然现实生活中，小伙伴们不会对自己这么严苛啊，这里的例子只是方便大家理解。

我们举一个项目上的应用，加深对节流的理解。
> 例子来源于拉勾教育-前端高手进阶， 有兴趣可以到应用里学习
一个左右两列布局的查看文章页面，左侧为文章大纲结构，右侧为文章内容。现在需要添加一个功能，就是当用户滚动阅读右侧文章内容时，左侧大纲相对应部分高亮显示，提示用户当前阅读位置。这个功能的实现思路比较简单，滚动前先记录大纲中各个章节的垂直距离，然后监听 scroll 事件的滚动距离，根据距离的比较来判断需要高亮的章节。伪代码如下：

```js
// 监听scroll事件
wrap.addEventListener('scroll', e => {
  let highlightId = ''
  // 遍历大纲章节位置，与滚动距离比较，得到当前高亮章节id
  for (let id in offsetMap) {
    if (e.target.scrollTop <= offsetMap[id].offsetTop) {
      highlightId = id
      break
    }
  }
  const lastDom = document.querySelector('.highlight')
  const currentElem = document.querySelector(`a[href="#${highlightId}"]`)
  // 修改高亮样式
  if (lastDom && lastDom.id !== highlightId) {
    lastDom.classList.remove('highlight')
    currentElem.classList.add('highlight')
  } else {
    currentElem.classList.add('highlight')
  }
})
```
功能是实现了，但这并不是最优方法，因为滚动事件的触发频率是很高的，持续调用判断函数很可能会影响渲染性能。实际上也不需要过于频繁地调用，因为当鼠标滚动 1 像素的时候，很有可能当前章节的阅读并没有发生变化。所以我们可以设置在指定一段时间内只调用一次函数，从而降低函数调用频率，这种方式我们称之为“节流”。

方法一：
通过一个标识位，来实现第一个截流,可以满足一般场景
```js
 function throttle (fn, interval = 0) {
    let isExecute = true
    return function (...args) {
      if (isExecute) {
        fn.apply(this, args)
        isExecute = false
        setTimeout(() => {
          isExecute = true
        }, interval) 
      }
    }
  }
```
方法二：
通过时间来控制

第一次就会触发， 因为第一次last ===0 ,导致 now 是一定大于 delay的，所以第一次必须触发
```js
function throttle(fn, interval) {
    let last = 0
    return function () {
        let now = Date.now()
        let context = this
        let args = arguments
        
        if (now - last > interval) {
            last = Date.now()
            fn.apply(context, args)
        }
    }
}
```
方法三，思想类似与方法一

第一次也是延迟执行，但是用户最后一次操作，也会延迟执行
```js
function throttle(fn, interval = 0) {
  let timer = null
  return function () {
      let args = arguments
      if (!timer) {
        timer = setTimeout(() => {
              fn.apply(this, args)
              clearTimeout(timer)
              timer = null
          }, interval)
      }
  }
}

```

方法四：更精确的时间控制防抖
```js
function throttle5(fn, interval) {
  let timer = null
  let startTime = Date.now()
  return function () {
      let curTime = Date.now()
      let remainning = interval - (curTime - startTime)
      let context = this
      let args = arguments
      clearTimeout(timer)
      // 操作已过剩余时间，立即执行
      if (remainning <=0) {
          // 重新计时
          startTime = Date.now()
          fn.apply(context, args)
      } else {
          timer = setTimeout(() => {
              fn.apply(context, args)
          }, remainning)
      }
  }
}
```
可以通过下面这点代码来验证调试throttle
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>截流与防抖</title></title>
    <script src="./debounce.js"></script>
    <script src="./throttle.js"></script>
    <style>
        .test {
            width: 200px;
            height: 200px;
            overflow: auto;
            background-color: burlywood;
        }
    </style>
</head>
<body>
    <div class="test">
        一个左右两列布局的查看文章页面，左侧为文章大纲结构，右侧为文章内容。现在需要添加一个功能，就是当用户滚动阅读右侧文章内容时，左侧大纲相对应部分高亮显示，提示用户当前阅读位置。这个功能的实现思路比较简单，滚动前先记录大纲中各个章节的垂直距离，然后监听 scroll 事件的滚动距离，根据距离的比较来判断需要高亮的章节。 
    </div>  
    <script>
        const ele = document.querySelector('.test')
        function scrollFn (e) {
            console.log('this==>', this)
            console.log('top', e.target.scrollTop)
        }
        ele.addEventListener('scroll', throttle5(scrollFn, 500))
    </script>
</body>
</html>
```