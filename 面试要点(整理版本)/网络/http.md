<!-- https://time.geekbang.org/column/article/147501 -->
## http 0.9 不支持传输多种类型的文件
## http 1.0 加入了请求头和响应头，可以传输接收多种类型的文件
    -  
     ```
        accept: text/html
        accept-encoding: gzip, deflate, br
        accept-Charset: ISO-8859-1,utf-8
        accept-language: zh-CN,zh
        accept: text/html
        accept-encoding: gzip, deflate, braccept-Charset: ISO-8859-1,utf-8
        accept-language: zh-CN,zh
    ```

## http 1.1 增加的新特性

1： 加入了持久连接

持久连接在 HTTP/1.1 中是默认开启的，所以你不需要专门为了持久连接去 HTTP 请求头设置信息，如果你不想要采用持久连接，可以在 HTTP 请求头中加上Connection: close。目前浏览器中对于同一个域名，默认允许同时建立 6 个 TCP 持久连接。

2： 不成熟http 管线化

- 队头阻塞问题， 持久连接虽然可以复用TCP连接，但是一次请求一次响应，如果其中一个请求发生了阻塞，后面就没法进行请求了。

- HTTP/1.1 中试图通过管线化的技术来解决队头阻塞的问题。

    HTTP/1.1 中的管线化是指将多个 HTTP 请求整批提交给服务器的技术，虽然可以整批发送请求，不过服务器依然需要根据请求顺序来回复浏览器的请求。FireFox、Chrome 都做过管线化的试验，但是由于各种原因，它们最终都放弃了管线化技术。
    
3： 提供虚拟主机的支持

在 HTTP/1.0 中，每个域名绑定了一个唯一的 IP 地址，因此一个服务器只能支持一个域名。但是随着虚拟主机技术的发展，需要实现在一台物理主机上绑定多个虚拟主机，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个 IP 地址。

因此，HTTP/1.1 的请求头中增加了 Host 字段，用来表示当前的域名地址，这样服务器就可以根据不同的 Host 值做不同的处理。

4：  对动态生成的内容提供了完美支持

在设计 HTTP/1.0 时，需要在响应头中设置完整的数据大小，如Content-Length: 901，这样浏览器就可以根据设置的数据大小来接收数据。不过随着服务器端的技术发展，很多页面的内容都是动态生成的，因此在传输数据之前并不知道最终的数据大小，这就导致了浏览器不知道何时会接收完所有的文件数据。

HTTP/1.1 通过引入 Chunk transfer 机制来解决这个问题，服务器会将数据分割成若干个任意大小的数据块，每个数据块发送时会附上上个数据块的长度，最后使用一个零长度的块作为发送数据完成的标志。这样就提供了对动态内容的支持。

5： 客户端 Cookie、安全机制

### http1.1 过度到 http2.0
HTTP/1.1 为网络效率做了大量的优化，最核心的有如下三种方式：
- 增加了持久连接；
- 浏览器为每个域名最多同时维护 6 个 TCP 持久连接；
- 使用 CDN 的实现域名分片机制。


但是http1.1 的问题：

- 第一个原因，TCP 的慢启动。
- 第二个原因，同时开启了多条 TCP 连接，那么这些连接会竞争固定的带宽
- 第三个原因，HTTP/1.1 队头阻塞的问题。
    们知道在 HTTP/1.1 中使用持久连接时，虽然能公用一个 TCP 管道，但是在一个管道中同一时刻只能处理一个请求，在当前的请求没有结束之前，其他的请求只能处于阻塞状态。这意味着我们不能随意在一个管道中发送请求和接收内容。

## http2.0 如何破局

总结下：HTTP/1.1 所存在的一些主要问题
- 慢启动和 TCP 连接之间相互竞争带宽是由于 TCP 本身的机制导致的
- 队头阻塞是由于 HTTP/1.1 的机制导致的

如何破局：


http2.0 新特性：多路复用机制
多路复用的实现：
- 二进制分帧层，通过数据的最小单位帧来进行传输。

- HTTP/2 的思路就是一个域名只使用一个 TCP 长连接来传输数据，这样整个页面资源的下载过程只需要一次慢启动，同时也避免了多个 TCP 连接竞争带宽所带来的问题

- 另外，就是队头阻塞的问题，等待请求完成后才能去请求下一个资源，这种方式无疑是最慢的，所以 HTTP/2 需要实现资源的并行请求，也就是任何时候都可以将请求发送给服务器，而并不需要等待其他请求的完成，然后服务器也可以随时返回处理好的请求资源给浏览器

http2 的其他特性：
多路复用技术是建立在二进制分帧层的基础之上

- 设置请求的优先级
- 服务器推送（HTTP/2 还可以直接将数据提前推送到浏览器）
- 头部压缩（传输效率肯定能得到大幅提升。）

### 服务端如何开启http2

可以通过nginx 开启
```

server {
        listen 443 ssl http2;
        ssl_certificate /etc/letsencrypt/live/your.domain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/your.domain.com/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/your.domain.com/chain.pem;
```


## http2 没有解决的问题

虽然 HTTP/2 解决了 HTTP/1.1 中的队头阻塞问题，但是 HTTP/2 依然是基于 TCP 协议的，而 TCP 协议依然存在数据包级别的队头阻塞问题，那么你觉得 TCP 的队头阻塞是如何影响到 HTTP/2 性能的呢？

是不管http/1我还是http/2，最后都需要经过tcp包的形式进行传输！

而tcp包也是按照顺序的，一个阻塞了，会影响到其它数据包的接受！

## http3.0


### http2.0的缺陷

#### 1: 底层依然使用tcp,丢包会导致阻塞
我们知道在 HTTP/2 中，多个请求是跑在一个 TCP 管道中的，如果其中任意一路数据流中出现了丢包的情况，那么就会阻塞该 TCP 连接中的所有请求。

这不同于 HTTP/1.1，使用 HTTP/1.1 时，浏览器为每个域名开启了 6 个 TCP 连接，如果其中的 1 个 TCP 连接发生了队头阻塞，那么其他的 5 个连接依然可以继续传输数据。

所以随着丢包率的增加，HTTP/2 的传输效率也会越来越差。有测试数据表明，当系统达到了 2% 的丢包率时，HTTP/1.1 的传输效率反而比 HTTP/2 表现得更好。

#### 2: TCP 建立连接的延时

网络延迟又称为 RTT（Round Trip Time）。RTT 是反映网络性能的一个重要指标。
我们把从浏览器发送一个数据包到服务器，再从服务器返回数据包到浏览器的整个往返时间称为 RTT。

三次握手，以及TLS连接也需要握手，都会导致延时。


### 如何破局 http3.0

 ![image.png](https://upload-images.jianshu.io/upload_images/5016475-05f9b4827d4c1204.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- UDP 不提供可靠性的传输，但 QUIC 在 UDP 的基础之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制等。并集成了TLS 加密功能，

- 实现了 HTTP/2 中的多路复用功能。和 TCP 不同，QUIC 实现了在同一物理连接上可以有多个独立的逻辑数据流（如下图）。实现了数据流的单独传输，就解决了 TCP 中队头阻塞的问题。如上图。

- 实现了快速握手功能

    由于 QUIC 是基于 UDP 的，所以 QUIC 可以实现使用 0-RTT 或者 1-RTT 来建立连接，这意味着 QUIC 可以用最快的速度来发送和接收数据，这样可以大大提升首次打开页面的速度。

### http3.0 的问题


- 服务器和浏览器端都没有对 HTTP/3 提供比较完整的支持
- 中间设备僵化的问题。这些设备对 UDP 的优化程度远远低于 TCP

### 总结：

- HTTP/2 中所存在的一些问题，主要包括了 TCP 的队头阻塞、建立 TCP 连接的延时、TCP 协议僵化等问题
- 这些问题都是 TCP 的内部问题，因此要解决这些问题就要优化 TCP 或者“另起炉灶”创造新的协议。
- HTTP/3 正是基于 QUIC 协议的。虽说这套协议解决了 HTTP/2 中因 TCP 而带来的问题，不过由于是改动了底层协议，所以推广起来还会面临着巨大的挑战。



常考面试题：


![image.png](https://upload-images.jianshu.io/upload_images/5016475-ad9e375171c32294.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](https://upload-images.jianshu.io/upload_images/5016475-bee5cf656bdebf78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](https://upload-images.jianshu.io/upload_images/5016475-b8af31e6316fdf6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


