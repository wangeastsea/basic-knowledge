import React, { Component } from 'react'

class List extends Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        const list = this.props.data
        return (
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        )
        // jsx仅仅是语法糖，最终会解析为js代码
        React.createElement('div', {id: 'div'}, [])
        React.createElement('div', {id: 'div'}, child1,child2,child3)

        /*
            React.createElement(
                "ul",
                null,
                list.map((item, index) => {
                    return React.createElement(
                        "li",
                        { key: index },
                        item
                    );
                })
            );
        */
    }
}

export default List