import React from 'react';

class Container extends React.Component {
  // props = src/App.jsのTODO_LIST
  constructor(props) {
    // コンポーネントがレンダリングされた時一回だけ呼ばれる
    super(props)
    this.state = {
      input: "",
      items: props.items,
      counter: props.items.length + 1,
    }
  }

  // クラスコンポーネントはrender()を持つ
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
    ]

    return (
      <div className="container-wrapper">
        <div className="container">
          {/* stateを子コンポーネントに渡します */}
          <TodoForm value={this.state.input}/>
          {
            itemList.map(elem => (
              <TodoList
                key={elem.title}
                title={elem.title}
                items={elem.items} />
            ))
          }
        </div>
      </div>
    )
  }
};

const TodoForm = (props) => (
  <form className="form" method="POST">
    {/* valueをContainerコンポーネントのstateで管理します */}
    <input type="text" name="todo" autoComplete="off" value={props.value} />
    <button type="submit" className="btn btn-primary">ADD</button>
  </form>
);

const TodoList = (props) => (
  // props = { title, items }
  // items = [ { id, todo, isDone }, ... ]
  <div>
    <label className="table-title">{props.title}</label>
    <table className="todo-list">
      <tbody>
        {
          props.items.map(item => (
            <TodoItem key={item.id} item={item} />
          ))
        }
      </tbody>
    </table>
  </div>
);

const TodoItem = (props) => (
  // props = { item }
  // item = { id, todo, isDone }
  <tr>
    <td>{props.item.todo}</td>
    {
      !props.item.isDone
        ? <td><button className="btn btn-primary">done</button></td>
        : <>
          <td><button className="btn btn-secondary">todo</button></td>
          <td><button className="btn btn-danger">delete</button></td>
        </>
    }
  </tr>
);

export default Container;
