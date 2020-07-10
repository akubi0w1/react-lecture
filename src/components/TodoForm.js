import React from 'react';

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

export default TodoForm;