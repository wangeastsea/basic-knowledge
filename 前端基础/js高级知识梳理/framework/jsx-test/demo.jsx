// 可以通过命令行的形式，通过babel来编译文件
/*@jsx h */
// 通过以上语句来修改react.createElement 为 h  (可扩展)
// babel --plugins transform-react-jsx demo.jsx

import Input from './input/index.js'
import List from './list/index.js'

function render() {
    return (
        <div>
            <p>this is demo</p>
            <Input addTitle={this.addTitle.bind(this)}/>
            <List data={this.state.list}/>
        </div>
    )
}

// var profile = <div>
//   <img src="avatar.png" className="profile" />
//   <h3>{[user.firstName, user.lastName].join(' ')}</h3>
// </div>;

// class Input extends Component {
//   render() {
//     return (
//       <div>
//           <input value={this. state.title} onChange={this.changeHandle.bind(this)}/>
//           <button onClick={this.clickHandle.bind(this)}>submit</button>
//       </div>
//     );
//   }
// }