### 什么是 XSS 攻击

### 定义
XSS 全称是 Cross Site Scripting，为了与“CSS”区分开来，故简称 XSS，翻译过来就是“跨站脚本”


### 攻击手段
XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。

### 攻击的结果

- 可以窃取 Cookie 信息

恶意 JavaScript 可以通过“document.cookie”获取 Cookie 信息，然后通过 XMLHttpRequest 或者 Fetch 加上 CORS 功能将数据发送给恶意服务器。恶意服务器拿到用户的 Cookie 信息之后，就可以在其他电脑上模拟用户的登录，然后进行转账等操作。

- 可以监听用户行为。

恶意 JavaScript 可以使用“addEventListener”接口来监听键盘事件，比如可以获取用户输入的信用卡等信息，将其发送到恶意服务器。黑客掌握了这些信息之后，又可以做很多违法的事情。

- 可以通过修改 DOM 伪造假的登录窗口，用来欺骗用户输入用户名和密码等信息

- 还可以在页面内生成浮窗广告，这些广告会严重地影响用户体验。

### 如何攻击

- 存储型 XSS 攻击

    - 首先黑客利用站点漏洞将一段恶意 JavaScript 代码提交到网站的数据库中；
    - 然后用户向网站请求包含了恶意 JavaScript 脚本的页面；
    - 当用户浏览该页面的时候，恶意脚本就会将用户的 Cookie 信息等数据上传到服务器。

- 反射型 XSS 攻击

    在一个反射型 XSS 攻击过程中，恶意 JavaScript 脚本属于用户发送给网站请求中的一部分，随后网站又把恶意 JavaScript 脚本返回给用户。当恶意 JavaScript 脚本在用户页面中被执行时，黑客就可以利用该脚本做一些恶意操作。

    但当打开http://localhost:3000/?xss=<script>alert('xss攻击')</script> 诱导性链接，用户自己点击了。在现实生活中，黑客经常会通过 QQ 群或者邮件等渠道诱导用户去点击这些恶意链接，所以对于一些链接我们一定要慎之又慎。

- 基于 DOM 的 XSS 攻击

    基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。具体来讲，黑客通过各种手段将恶意脚本注入用户的页面中，比如通过网络劫持在页面传输过程中修改 HTML 页面的内容，这种劫持类型很多，有通过 WiFi 路由器劫持的，有通过本地恶意软件来劫持的，它们的共同点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。



### 如何阻止 XSS 攻击


我们知道存储型 XSS 攻击和反射型 XSS 攻击都是需要经过 Web 服务器来处理的，因此可以认为这两种类型的漏洞是服务端的安全漏洞。

而基于 DOM 的 XSS 攻击全部都是在浏览器端完成的，因此基于 DOM 的 XSS 攻击是属于前端的安全漏洞。

但无论是何种类型的 XSS 攻击，它们都有一个共同点，
**那就是首先往浏览器中注入恶意脚本，然后再通过恶意脚本将用户信息发送至黑客部署的恶意服务器上。**

#### 方法1: 服务器对输入脚本进行过滤或转码 

对<script>的尖括号进行转码
```
code:&lt;script&gt;alert(&#39;你被xss攻击了&#39;)&lt;/script&gt;
```

#### 方法2: 充分利用 CSP （Content-Security-Policy）

- 限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；
- 禁止向第三方域提交数据，这样用户数据也不会外泄；
- 禁止执行内联脚本和未授权的脚本；
- 还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

```html
<meta htte-equiv="Content-Security-Policy" content="default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi">
```

- 利用httpOnly 属性

由于很多 XSS 攻击都是来盗用 Cookie 的，因此还可以通过使用 HttpOnly 属性来保护我们 Cookie 的安全。

通常服务器可以将某些 Cookie 设置为 HttpOnly 标志，HttpOnly 是服务器通过 HTTP 响应头来设置的，下面是打开 Google 时，HTTP 响应头中的一段：

```js
    set-cookie: NID=189=M8q2FtWbsR8RlcldPVt7qkrqR38LmFY9jUxkKo3-4Bi6Qu_ocNOat7nkYZUTzolHjFnwBw0izgsATSI7TZyiiiaV94qGh-BzEYsNVa7TZmjAYTxYTOM9L_-0CN9ipL6cXi8l6-z41asXtm2uEwcOC5oh9djkffOMhWqQrlnCtOI; expires=Sat, 18-Apr-2020 06:52:22 GMT; path=/; domain=.google.com; HttpOnly
```
我们可以看到，set-cookie 属性值最后使用了 HttpOnly 来标记该 Cookie。顾名思义，使用 HttpOnly 标记的 Cookie 只能使用在 HTTP 请求过程中，所以无法通过 JavaScript 来读取这段 Cookie。

### 总结

XSS 攻击就是黑客往页面中注入恶意脚本，然后将页面的一些重要数据上传到恶意服务器。

- 存储型 XSS 攻击、
- 反射型 XSS 攻击
- 基于 DOM 的 XSS 攻击。

共同点： 
这三种攻击方式的共同点是都需要往用户的页面中注入恶意脚本，然后再通过恶意脚本将用户数据上传到黑客的恶意服务器上

不同点：
而三者的不同点在于注入的方式不一样，有通过服务器漏洞来进行注入的，还有在客户端直接注入的。

防范策略：

- 通过服务器对输入的内容进行过滤或者转码
- 充分利用好 CSP
- 使用 HttpOnly 来保护重要的 Cookie 信息
- 对于一些不受信任的输入，还可以限制其输入长度，增加验证机制。

#### 补充 CSP

内容安全策略   (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS (en-US)) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。



为使CSP可用, 你需要配置你的网络服务器返回  Content-Security-Policy  HTTP头部 ( 有时你会看到一些关于X-Content-Security-Policy头部的提法, 那是旧版本，你无须再如此指定它)。


除此之外,  <meta>  元素也可以被用来配置该策略,

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

CSP 的主要目标是减少和报告 XSS 攻击 ，XSS 攻击利用了浏览器对于从服务器所获取的内容的信任。恶意脚本在受害者的浏览器中得以运行，因为浏览器信任其内容来源，即使有的时候这些脚本并非来自于它本该来的地方。

CSP通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除XSS攻击所依赖的载体。一个CSP兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本 (包括内联脚本和HTML的事件处理属性)。

配置内容安全策略涉及到添加 Content-Security-Policy  HTTP头部到一个页面，并配置相应的值，以控制用户代理（浏览器等）可以为该页面获取哪些资源。比如一个可以上传文件和显示图片页面，应该允许图片来自任何地方，但限制表单的action属性只可以赋值为指定的端点。

我们看以下例子来理解：
- 一个网站管理者想要所有内容均来自站点的同一个源 (不包括其子域名)
```
Content-Security-Policy: default-src 'self'
```

- 一个网站管理者允许内容来自信任的域名及其子域名 (域名不必须与CSP设置所在的域名相同)
```
Content-Security-Policy: default-src 'self' *.trusted.com
```
- 
```

Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com

```
解释： 

    1: 图片可以从任何地方加载(注意 "*" 通配符)。
    2: 多媒体文件仅允许从 media1.com 和 media2.com 加载(不允许从这些站点的子域名)。
    3: 运行脚本仅允许来自于userscripts.example.com。

- 一个线上银行网站的管理者想要确保网站的所有内容都要通过SSL方式获取，以避免攻击者窃听用户发出的请求。

```
// 该服务器仅允许通过HTTPS方式并仅从onlinebanking.jumbobank.com域名来访问文档。
Content-Security-Policy: default-src https://onlinebanking.jumbobank.com

```


## 你了解哪些前端安全知识？或者说了解哪些名词？  

 浏览器相关：
 - 1: XSS
 - 2: CSRF
 - 3: HTTPS
 - 4: CSP (内容安全策略， 可以禁止加载外域的代码，禁止外域的提交)
 - 5: HSTS（强制客户端使用HTTPS与服务端建立连接）
 - 6: X-Frame-Options（控制当前页面是否可以被嵌入到iframe中， 同域名的可以嵌入）
 - 7: SRI（subresource intergrity 子资源的完整性）
    - 1. xxx.js 打包后注入到了index.html中， 并上传到了cdn
    - 2. 用户在请求的时候，根据xxx.js去请求，而这个文件可能被篡改。
    - 3. 打包的时候，根据js内容生成一个hash值，并且把hash值作为intergrity属性注入到script中
    - 4. 这样把资源请求回来之后，做内容的hash，然后对比，验证资源的完整性
 8: Referer-Policy（控制Referer携带策略）

 Node（服务端）相关：
 1: 本地文件操作相关，路径拼接导致的文件泄露
 2: ReDos(正则表达式攻击) 就是正则表达式写的不规范，导致服务器疯狂运行不结束，浪费服务器资源
 3：时序攻击

  ![image.png](https://upload-images.jianshu.io/upload_images/5016475-c08fb4417aedb3fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 4: ip origin Referer  request headers



### 本地文件操作

比如我们提供一个静态服务，通过请求的参数url来返回给用户/前端想要的资源(路径拼接的问题)

express static

koa-static

![image.png](https://upload-images.jianshu.io/upload_images/5016475-85b3027ee42c6ad6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 
通过 resolve-path 可以解决这个问题

![image.png](https://upload-images.jianshu.io/upload_images/5016475-c1365323e46e2d48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)