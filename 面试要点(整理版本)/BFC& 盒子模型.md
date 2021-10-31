1:css盒子模型
- 标准模型  content不计算padding, border
- IE模型(怪异盒模型)   content计算padding, border

2: 区别：
content-box不计算padding, border
border-box 计算padding, border

3: 如何设置：
box-sizing: content-box   标准模型  (浏览器默认的方式)
box-sizing: border-box    IE模型

4: 如何获取盒模型的宽和高：
- dom.style.width/ height (只能取到内联样式的宽高)
- window.getComputedStyle(dom).width/ height
- dom.getBoundingClientRect.width/height

5: 根据盒模型解释边距重叠
 见BFC
6: BFC 边距解决方案 

块级格式上下文

BFC的原理：
- 在垂直方向的边距会发生重叠
- BFC的区域不会与浮动的元素重叠,包括垂直方向上
- BFC在页面上是一个独立的容器
- 计算BFC高度时候，会将浮动元素计算在内
`对比 bfc.html`
7: 如何触发BFC
- float 为 left, right
- display 为 inline-block
- overflow 不为 visible
- 绝对定位元素（元素的 position 为 absolute 或 fixed）



8: css的优先级如何回答
- 越具体优先级别越高
- 写在后面的覆盖写在前面的
- important! 最高，少用

9: 清除浮动

```css
content: '';
display: block;
/* display: table */
clear: both;
```
.clearfix 加到容器上，里面的子元素的浮动就被清除了

```css
.clearfix::after {
    content: '',
    display: block,
    clear: both;
}
```
10: 伪类 与伪元素的区别 可以参考：https://www.cnblogs.com/ihardcoder/p/5294927.html

伪元素的由两个冒号::开头，然后是伪元素的名称。
伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
伪元素本质上是创建了一个有内容的虚拟容器；
CSS3中伪类和伪元素的语法不同；
可以同时使用多个伪类，而只能同时使用一个伪元素；