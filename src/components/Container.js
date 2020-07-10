import React from 'react';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

class Container extends React.Component {
  constructor(props) {
    super(props);
    // stateの初期化を変更
    this.state = {
      input: "",
      items: [],
      counter: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // コンポーネントがマウントされた時に実行される
  componentDidMount() {
    this.setState({
      items: this.props.items,
      counter: this.props.items.length + 1,
    });
  }

  // コンポーネントがアンマウントされる時に実行される
  componentWillUnmount() {
    this.setState({
      items: [],
      counter: 0,
      input: '',
    });
  }

  // inputフィールドの値の変更をstateに反映する
  handleChange(value) {
    this.setState({
      input: value
    });
  }

  // submitされたらstate.itemsを更新する
  handleSubmit(value) {
    if (!value) {
      console.log("empty input");
      return
    }
    const newItem = {
      id: this.state.counter,
      todo: value,
      isDone: false,
    }
    this.setState({
      items: [
        newItem,
        ...this.state.items
      ],
      counter: this.state.counter + 1,
      input: "",
    })
  }

  // todo/doneの切り替え
  handleSwitch(todoId) {
    const newItems = this.state.items.map(item => item.id === todoId ? {...item, isDone: !item.isDone} : item);
    this.setState({
      items: newItems
    });
  }

  // 削除ハンドラ
  handleDelete(todoId) {
    const newItems = this.state.items.filter(item => item.id !== todoId)
    this.setState({
      items: newItems
    })
  }

  render() {
    const itemList = [
      {
        title: "todo",
        items: this.state.items.filter(todo => !todo.isDone)
      },
      {
        title: "done",
        items: this.state.items.filter(todo => todo.isDone)
      }
    ];

    return (
      <div className="container-wrapper">
        <div className="container">
          {/* 定義したハンドラを渡す */}
          <TodoForm
            value={this.state.input}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>
          {/* 定義したハンドラを渡す */}
          {
            itemList.map(elem => (
              <TodoList
                key={elem.title}
                title={elem.title}
                items={elem.items}
                handleSwitch={this.handleSwitch}
                handleDelete={this.handleDelete}/>
            ))
          }
        </div>
      </div>
    );
  }
};

export default Container;
