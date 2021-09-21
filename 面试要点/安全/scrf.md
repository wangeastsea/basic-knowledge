https://time.geekbang.org/column/article/154110
### 什么是 CSRF 攻击

CSRF 英文全称是 Cross-site request forgery，所以又称为“跨站请求伪造”，是指黑客引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。简单来讲，CSRF 攻击就是黑客利用了用户的登录状态，并通过第三方的站点来做一些坏事。


#### 1: 自动发起get请求
``` html
<!DOCTYPE html>
<html>
  <body>
    <h1>黑客的站点：CSRF攻击演示</h1>
    <img src="https://time.geekbang.org/sendcoin?user=hacker&number=100">
  </body>
</html>
```


#### 2: 自动发起post请求
```html
<!DOCTYPE html>
<html>
<body>
  <h1>黑客的站点：CSRF攻击演示</h1>
  <form id='hacker-form' action="https://time.geekbang.org/sendcoin" method=POST>
    <input type="hidden" name="user" value="hacker" />
    <input type="hidden" name="number" value="100" />
  </form>
  <script> document.getElementById('hacker-form').submit(); </script>
</body>
</html>
```

#### 3: 引诱用户点击链接
```html

<div>
  <img width=150 src=http://images.xuejuzi.cn/1612/1_161230185104_1.jpg> </img> </div> <div>
  <a href="https://time.geekbang.org/sendcoin?user=hacker&number=100" taget="_blank">
    点击下载美女照片
  </a>
</div>
```


以上三种就是黑客经常采用的攻击方式,如果当用户登录了极客时间，以上三种 CSRF 攻击方式中的任何一种发生时，那么服务器都会将一定金额的极客币发送到黑客账户。


**和 XSS 不同的是，CSRF 攻击不需要将恶意代码注入用户的页面，仅仅是利用服务器的漏洞和用户的登录状态来实施攻击。**

#### 如何防止 CSRF 攻击

- 特征
    - 目标站点一定要有 CSRF 漏洞；
    - 用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；
    - 需要用户打开一个第三方站点，可以是黑客的站点，也可以是一些论坛。

与 XSS 攻击不同，CSRF 攻击不会往页面注入恶意脚本，因此黑客是无法通过 CSRF 攻击来获取用户页面数据的；其最关键的一点是要能找到服务器的漏洞，所以说对于 CSRF 攻击我们主要的防护手段是提升服务器的安全性。

##### 如何防止
- 1: 充分利用好 Cookie 的 SameSite 属性

    相信你已经知道了黑客会利用用户的登录状态来发起 CSRF 攻击，而 Cookie 正是浏览器和服务器之间维护登录状态的一个关键数据，因此要阻止 CSRF 攻击，我们首先就要考虑在 Cookie 上来做文章。

    通常 CSRF 攻击都是从第三方站点发起的，要防止 CSRF 攻击，我们最好能实现从第三方站点发送请求时禁止 Cookie 的发送，因此在浏览器通过不同来源发送 HTTP 请求时，有如下区别

    - 如果是从第三方站点发起的请求，那么需要浏览器禁止发送某些关键 Cookie 数据到服务器；
    - 如果是同一个站点发起的请求，那么就需要保证 Cookie 数据正常发送。

    那 SameSite 是怎么防止 CSRF 攻击的呢？

    在 HTTP 响应头中，通过 set-cookie 字段设置 Cookie 时，可以带上 SameSite 选项，如下：
    ```
        set-cookie: 1P_JAR=2019-10-20-06; expires=Tue, 19-Nov-2019 06:36:21 GMT; path=/; domain=.google.com; SameSite=none
    ```
    SameSite 选项通常有 Strict、Lax 和 None 三个值。
    - Strict 最为严格。如果 SameSite 的值是 Strict，那么浏览器会完全禁止第三方 Cookie。简言之，如果你从极客时间的页面中访问 InfoQ 的资源，而 InfoQ 的某些 Cookie 设置了 SameSite = Strict 的话，那么这些 Cookie 是不会被发送到 InfoQ 的服务器上的。只有你从 InfoQ 的站点去请求 InfoQ 的资源时，才会带上这些 Cookie。
    - Lax 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。
    -  而如果使用 None 的话，在任何情况下都会发送 Cookie 数据。


- 2: 验证请求的来源站点

    在服务器端验证请求来源的站点。由于 CSRF 攻击大多来自于第三方站点，因此服务器可以禁止来自第三方站点的请求。那么该怎么判断请求是否来自第三方站点呢？
    这就需要介绍 HTTP 请求头中的 Referer 和 Origin 属性了。

    Referer 是 HTTP 请求头中的一个字段，记录了该 HTTP 请求的来源地址。然可以通过 Referer 告诉服务器 HTTP 请求的来源，但是有一些场景是不适合将来源 URL 暴露给服务器的，


    但在服务器端验证请求头中的 Referer 并不是太可靠，因此标准委员会又制定了 Origin 属性，在一些重要的场合，比如通过 XMLHttpRequest、Fecth 发起跨站请求或者通过 Post 方法发送请求时，都会带上 Origin 属性，

    ![image.png](https://upload-images.jianshu.io/upload_images/5016475-055f11019a8e8737.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    origin 属性只包含了域名信息，并没有包含具体的 URL 路径，这是 Origin 和 Referer 的一个主要区别.


- 3: CSRF Token

    - 第一步，在浏览器向服务器发起请求时，服务器生成一个 CSRF Token。CSRF Token 其实就是服务器生成的字符串，然后将该字符串植入到返回的页面中。你可以参考下面示例代码：
    ```html

    <!DOCTYPE html>
    <html>
    <body>
        <form action="https://time.geekbang.org/sendcoin" method="POST">
        <input type="hidden" name="csrf-token" value="nc98P987bcpncYhoadjoiydc9ajDlcn">
        <input type="text" name="user">
        <input type="text" name="number">
        <input type="submit">
        </form>
    </body>
    </html>
    ```
    - 第二步，在浏览器端如果要发起转账的请求，那么需要带上页面中的 CSRF Token，然后服务器会验证该 Token 是否合法。如果是从第三方站点发出的请求，那么将无法获取到 CSRF Token 的值，所以即使发出了请求，服务器也会因为 CSRF Token 不正确而拒绝请求。

### 总结
- 目标站点存在漏洞
- 用户已经登录了目标站点
- 黑客需要通过第三方站点发起攻击

如何防止 CSRF 攻击
 - 充分利用好 Cookie 的 SameSite 属性
 - 验证请求的来源站点 origin
 - 使用 CSRF Token


 我们可以得出页面安全问题的主要原因就是浏览器为同源策略开的两个“后门”：一个是在页面中可以任意引用第三方资源，另外一个是通过 CORS 策略让 XMLHttpRequest 和 Fetch 去跨域请求资源。

 为了解决这些问题，
 - 我们引入了 CSP 来限制页面任意引入外部资源
 - 引入了 HttpOnly 机制来禁止 XMLHttpRequest 或者 Fetch 发送一些关键 Cookie
 - 引入了 SameSite 和 Origin 来防止 CSRF 攻击。





### 答疑
> 简言之，如果你从极客时间的页面中访问 InfoQ 的资源，而 InfoQ 的某些 Cookie 设置了 SameSite = Strict 的话，那么这些 Cookie 是不会被发送到 InfoQ 的服务器上的。只有你从 InfoQ 的站点去请求 InfoQ 的资源时，才会带上这些 Cookie。

 ```
 首先假设你发出登录InfoQ的站点请求，然后在InfoQ返回HTTP响应头给浏览器，InfoQ响应头中的某些set-cookie字段如下所示：
set-cookie: a_value=avalue_xxx; expires=Thu, 21-Nov-2019 03:53:16 GMT; path=/; domain=.infoq.com; SameSite=strict
set-cookie: b_value=bvalue_xxx; expires=Thu, 21-Nov-2019 03:53:16 GMT; path=/; domain=.infoq.com; SameSite=lax
set-cookie: c_value=cvaule_xxx; expires=Thu, 21-Nov-2019 03:53:16 GMT; path=/; domain=.infoq.com; SameSite=none
set-cookie: d_value=dvaule_xxxx; expires=Thu, 21-Nov-2019 03:53:16 GMT; path=/; domain=.infoq.com;


我们可以看出，
a_value的SameSite属性设置成了strict，
b_value的SameSite属性设置成了lax
c_value的SameSite属性值设置成了none
d_value没有设置SameSite属性值


好，这些Cookie设置好之后，当你再次在InfoQ的页面内部请求InfoQ的资源时，这些Cookie信息都会被附加到HTTP的请求头中，如下所示：
cookie: a_value=avalue_xxx;b_value=bvalue_xxx;c_value=cvaule_xxx;d_value=dvaule_xxxx;

但是，假如你从time.geekbang.org的页面中，通过a标签打开页面，如下所示：
<a href="https://www.infoq.cn/sendcoin?user=hacker&number=100">点我下载</a>
当用户点击整个链接的时候，因为InfoQ中a_vaule的SameSite的值设置成了strict，那么a_vaule的值将不会被携带到这个请求的HTTP头中。

如果time.geekbang.org的页面中，有通过img来加载的infoq的资源代码，如下所示：
 <img src="https://www.infoq.cn/sendcoin?user=hacker&number=100">
那么在加载infoQ资源的时候，只会携带c_value,和d_value的值。
 ```