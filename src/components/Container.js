import React from 'react';

class Container extends React.Component {
  // props = src/App.jsのTODO_LIST
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      items: props.items,
      counter: props.items.length + 1,
    };

    // ここでbindしてあげないと、handle内でthisが使えません
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // inputフィールドの値の変更をstateに反映する
  handleChange(value) {
    this.setState({
      input: value
    });
  }

  // submitされたらstate.itemsを更新する
  handleSubmit(value) {
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

// handlerが必要なのでクラスにしなくちゃあかんわ
class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    // ここでbindしてあげないと、handle内でthisが使えません
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault() // POSTリクエストが飛んでいくのを阻止する
    this.props.handleSubmit(this.props.value)
  }

  render() {
    return (
      // submitハンドラを指定
      <form className="form" method="POST" onSubmit={this.handleSubmit}>
        {/* changeハンドラを指定 */}
        <input type="text" name="todo" autoComplete="off" value={this.props.value} onChange={this.handleChange} />
        <button type="submit" className="btn btn-primary">ADD</button>
      </form>
    );
  }
}

const TodoList = (props) => (
  // props = { title, items }
  // items = [ { id, todo, isDone }, ... ]
  <div>
    <label className="table-title">{props.title}</label>
    <table className="todo-list">
      <tbody>
        {
          // さらにハンドラを渡す
          props.items.map(item => (
            <TodoItem 
              key={item.id}
              item={item}
              handleSwitch={props.handleSwitch}
              handleDelete={props.handleDelete}/>
          ))
        }
      </tbody>
    </table>
  </div>
);

// ハンドラ定義のためにclassにしなきゃあかんわ
class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSwitch(e) {
    this.props.handleSwitch(this.props.item.id);
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.item.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.todo}</td>
        {
          !this.props.item.isDone
            // 各ボタンにハンドラをしてする
            ? <td><button className="btn btn-primary" onClick={this.handleSwitch}>done</button></td>
            : <>
              <td><button className="btn btn-secondary" onClick={this.handleSwitch}>todo</button></td>
              <td><button className="btn btn-danger" onClick={this.handleDelete}>delete</button></td>
            </>
        }
      </tr>
    );
  }
}

export default Container;
