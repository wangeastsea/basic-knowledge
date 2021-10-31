### 内容分发网络（Content Dilivery Network）

CDN 的回源策略：

- 服务提供者的静态资源如何进入CDN？


求请 ->  CDN 的DNS服务 ->  经过负载均衡 -> CDN的资源节点 -> 回源 -> 服务器

### 触发回源的策略

- CDN 节点没有对应资源时主动到源站获取资源；
- 缓存失效后，CDN 节点到源站获取资源
- CDN管理后台或者使用开放接口主动刷新触发回源。

## 请简述 CDN 回源是如何工作的？

CDN 回源就是 CDN 节点到源站请求资源，重新设置缓存。通常服务提供方在使用 CDN 的时候，会在自己的某个域名发布静态资源，然后将这个域名交给 CDN。

比如源站在 s.example.com 中发布静态资源，然后在 CDN 管理后台配置了这个源站。在使用 CDN 时，服务提供方会使用另一个域名，比如说 b.example.com。然后配置将 b.example.com 用 CNAME 记录指向 CDN 的智能 DNS。这个时候，如果用户下载b.example.com/a.jpg，CDN 的智能 DNS 会帮用户选择一个最优的 IP 地址（最优的 CDN 节点）响应这次资源的请求。如果这个 CDN 节点没有 a.jpg，CDN 就会到 s.example.com 源站去下载，缓存到 CDN 节点，然后再返回给用户。
