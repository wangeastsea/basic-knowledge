
方法一：

通过WebView提供的接口，向JavaScript的window中注入对象或者方法，让JavaScript调用时，
直接执行相应的Native代码逻辑，达到JavaScript调用Native的目的


前端调用方法： 
- 注入api的方式
```js
ioswindow.jsSendMessage(message);
androidwindow.jsSendMessage.getNativeData()
```
- JavaScript调用Native-拦截URLSCHEME
scheme://[path][?query]
应用标识：//路径


不建议使用拦截URLSCHEME

URL会有长度限制，一旦过长就会出现信息丢失因此，类似WebViewJavaScriptBridge这类库，
就结合了注入API的形式一起使用

- 现有的开源方案
    - iOS WebViewJavaScriptBridge
    - 安卓 JsBridge


- 调用方式
- javascript调用native
- native 调用javascript


yl的方案： 使用了注入api的方式


调用app的2个核心方法：
返回的封装成promise

event 可以是一个事件名称，也可以是一个schema协议

- callApp(event,data ={})
    - 调用app的方法，并返回promise的结果
    - 根据当前的事件，注册成功回调，失败回调，挂载到window上
    - 针对安卓和ios， 需要兼容数据格式
    - 在根据安卓和ios判断执行不同的方法
     ```js
    if (isAndroid) {
        data = JSON.stringify(data)
        window.JSActionBridge.handlerAction(
            event,
            data,
            successName,
            failName
        )
    }
    if (isIOS) {
        window.webkit.messageHandlers.JSActionBridge.postMessage({
            method: 'handlerAction',
            data: {
                actionEvent: event,
                paramsJsonValue: data,
                successCallback: successName,
                errorCallback: failName
            }
        })
    }
     ```
- registerFn 注册app调用的方法
```js
registerFn (fnName, fn) {
    if (typeof fnName !== 'string') {
        throw TypeError('Illegal fnName: Not an string')
    }
    if (typeof fn !== 'function') {
        throw TypeError('Illegal fn: Not an function')
    }

    window[fnName] = function (data) {
        if (isIOS) {
            fn(data)
        }
        if (isAndroid) {
            data = data || '{}'
            fn(JSON.parse(data))
        }
    }
},
```
- unregisterFn 注销app调用方法

```js
unregisterFn (fnName) {
    if (typeof fnName !== 'string') {
        throw TypeError('Illegal fnName: Not an string')
    }
    delete window[fnName]
},
```

- 针对安卓和ios， 需要兼容数据格式