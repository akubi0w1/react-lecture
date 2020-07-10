import React from 'react';

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
              handleDelete={props.handleDelete} />
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

export default TodoList;