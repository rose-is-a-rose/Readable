import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCommentToServer } from '../actions'

class AddComment extends Component {

  state = {
    body: '',
    author: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    debugger
    this.props.handleAddComment({
      body:this.state.body,
      author:this.state.author,
      parentId: this.props.postID,
      timestamp: new Date().getTime(),
      id: require("uuid").v4()
    })
  }

  render() {
    return (
      <div>
        <h4>Add a Comment</h4>
        <div className="input-field">
          <input
            id="body"
            type="text"
            onChange={(e) => this.setState({
              body: e.target.value
            })}
            value={this.state.body}
          />
          <label htmlFor="body">Comment</label>
        </div>
        <div className="input-field">
          <input
            id="author"
            type="text"
            onChange={(e) => this.setState({
              author: e.target.value
            })}
            value={this.state.author}
          />
          <label htmlFor="author">Author</label>
        </div>
        <button
          className="btn right"
          onClick={(e) => this.handleSubmit(e)}
        >
          Add Comment
        </button>
      </div>
    );
  }
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    handleAddComment: (data) => dispatch(addCommentToServer(data))
  }
}

export default connect(null, mapDispatchToProps)(AddComment);
