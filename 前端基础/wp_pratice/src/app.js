import React from 'react';
import ReactDOM from 'react-dom';
// import style from './common/style/main.css';
// import aac from './common/style/aac.css';
import 'font-awesome/css/font-awesome.css' //全局使用
// import shenzhen from './common/img/shenzhen.jpg

 // import style from './main.css'  //模块化使用
 // import './common/style/main.less'
 // import './common/style/main.scss'
 // import S from './main.les s'

ReactDOM.render(
  <div>
    <img src={require('./common/img/shenzhen.jpg')} alt=""/>
    <i className="fa fa-rocket"></i>
  </div>,
  document.getElementById('root') 
)
