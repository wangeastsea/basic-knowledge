#### 问：我们平时访问⼀个⽹网站, 一个应⽤用程序, 并不是用ip来访问的, ⽽是用⼀个域名. 那么域名是怎么和ip地址建立联系的呢?

就是通过dns, Domain Name System. ⽐如wiki上的一个例子以访问zh.wikipedia.org为例：
 
客户端发送查询报文”query zh.wikipedia.org”⾄DNS服务器，DNS服务⾸首先检查⾃身缓存，如果存在记录则直接返回结果。如果记不存在，则：DNS服务器向**根域名服务器**发送查询报⽂文”query zh.wikipedia.org”，根域名服务器返回顶级域 .org 的**顶级域名服务器**地址。DNS服务器向 .org 域的顶级域名服务器发送查询报文”query zh.wikipedia.org”，得到二级
域 .wikipedia.org的**权威域名服务器**地址。

DNS服务器向 .wikipedia.org域的权威域名服务器发送查询报文”query zh.wikipedia.org”，得到主机 zh 的A记录，存⼊自身缓存并返回给客户端


DNS服务器向 -> 根域名服务器 -> 顶级域名服务器 -> 二级权威域名服务器 -> DNS服务器