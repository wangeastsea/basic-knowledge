### csrf    
- 基本概念
    跨站请求伪造 cross-site request forgery
- 攻击原理
    ![image.png](https://upload-images.jianshu.io/upload_images/5016475-5152fbdd222fc3d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


    具体流程如下：
    - 用户首先登陆一个合法的网站，通过用户名和密码，登陆成功之后，网站下发cookie
    - 此时用户又登陆了网站B，网站B返回了一个网页，里面包含了一个引诱性质的按钮（包装了A网站的一个操作接口），此时如果用户点击了这个按钮，就会通带cookie直接登陆了A网站(身份确认成功)，并执行了这个操作接口（get）

    攻击能成功的2大因素：
    - 用户之前登陆过A网站
    - A网站的接口存在漏洞
- 防御措施
    - Token验证
    - Referer 验证
        页面来源的验证，服务器会判断是否是当前站点的页面，如果不是，就拦截
    - 隐藏令牌
      跟Token验证原理一致，不同的是Token验证 可能放到了URL中，但是隐藏令牌 是将token放到Http请求头中。
### xss

- 基本概念
    xss(cross-sit scripting 跨域脚本攻击)
    
- 攻击原理
 TODO
 攻击原理： http://wwww.imooc.com/learn/812
 防御措施： http://www.imooc.com/learn/812

 xss 是通过类似于评论区中写入js脚本去运行。
 csrf 是 通过自身网站api的漏洞进行攻击的， 并依赖于用户登录网站。

