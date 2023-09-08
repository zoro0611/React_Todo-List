import React, { Component, Fragment } from 'react';

class TodoList extends Component {

    
    constructor(props) {
        super(props);
        const storedList = JSON.parse(localStorage.getItem('list'));
        this.state = {
            inputValue: '',
            mylist: storedList ? storedList : []
        };
    }
    render() {
        return (
            <Fragment>
                <h3>React.js TodoList(localstorage)</h3>
            <div>
                <input 
                    value={this.state.inputValue}
                    onChange={this.handleInputChange.bind(this)}
                />
                <button onClick={this.handleAddList.bind(this)}>新增</button>
                
                
            </div>
            <ul>
                {
                    this.state.mylist.length > 0 ? (
                        this.state.mylist.map((item, index) => {
                            const itemStyle = item.status ? { textDecoration: 'line-through',  } : {color: 'red'};
                            return (
                                <li style={{listStyle: 'none'}} key={index}>
                                    <span>{index +1 }. </span>
                                    <span style={itemStyle}>{item.name}</span>
                                    <button onClick={() => this.handleDeleteList(index)}>刪除</button>
                                    <button onClick={()=>this.handleUnCompleteList(index)}>未完成</button>
                                    <button onClick={()=>this.handleCompleteList(index)}>完成</button>
                                </li>
                            );
                        })
                    ) : (
                        <li>Empty List</li>
                    )
                }
            </ul>

            </Fragment>
        )
    }

    handleInputChange(event){
        this.setState({
            inputValue: event.target.value
        })
    }
    handleAddList(){
        const item = this.state.inputValue;
        if (item !== '') {
            // 更新 this.state.list 并保存到 localStorage

            let obj ={
                name: item,
                status: false
            }


            this.setState(prevState => {
                const updatedList = [...prevState.mylist, obj];
                localStorage.setItem('list', JSON.stringify(updatedList));
                return {
                    mylist: updatedList,
                    inputValue: ''
                };
            });
        }
    }
    handleDeleteList(index) {
        console.log(index)
        const list = [...this.state.mylist];
        list.splice(index, 1);
        this.setState({
            mylist: list
        });

        let localStorageList = JSON.parse(localStorage.getItem('list'));
        localStorageList.splice(index, 1);
        localStorage.setItem('list', JSON.stringify(localStorageList));


    }

    handleCompleteList(index) {
        const list = [...this.state.mylist];
        let obj = list[index];
        obj.status = true;
        list[index] = obj;
        this.setState({
            mylist: list
        });
        localStorage.setItem('list', JSON.stringify(list));

    }

    handleUnCompleteList(index) {
        const list = [...this.state.mylist];
        let obj = list[index];
        obj.status = false;
        list[index] = obj;
        this.setState({
            mylist: list
        });
        localStorage.setItem('list', JSON.stringify(list));
    }
    
}

export default TodoList;