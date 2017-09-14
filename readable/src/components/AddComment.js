import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCommentToServer, updateCommentToServer } from '../actions'

/**
 * Component to add or update comment
 */
class AddComment extends Component {

  state = {
    body: '',
    author: ''
  }

  componentDidMount() {
    if (this.props.commentID && this.props.comments) {
      const comment = this.props.comments[this.props.postID].find(c =>
        c.id === this.props.commentID
      );
      if (comment) {
        this.setState({
          body: comment.body,
          author: comment.author
        })
      };
    }
  }

  /**
   * Add Comment
   * @param {e} Event
   */
  addComment = (e) => {
    e.preventDefault()
    this.props.handleAddComment({
      body:this.state.body,
      author:this.state.author,
      parentId: this.props.postID,
      timestamp: new Date().getTime(),
      id: require("uuid").v4()
    })
  }

  /**
   * Update Comment
   * @param {e} Event
   */
  updateComment = (e) => {
    e.preventDefault()
    this.props.handleUpdateComment({
      body:this.state.body,
      timestamp: new Date().getTime(),
      id: this.props.commentID
    })
  }

  render() {
    const existingComment = !!this.props.commentID;

    return (
      <div>
        <h4>
          {existingComment ? 'Update Comment' : 'Add a Comment'}
        </h4>
        <div className="input-field">
          <label className="active"
            htmlFor="body"
          >
            Comment
          </label>
          <input
            id="body"
            type="text"
            onChange={(e) => this.setState({
              body: e.target.value
            })}
            value={this.state.body}
          />
        </div>
        {!existingComment && (
          <div className="input-field">
            <label className="active"
              htmlFor="author"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              onChange={(e) => this.setState({
                author: e.target.value
              })}
              value={this.state.author}
            />
          </div>
        )}
        <button className="btn right"
          onClick={(e) => (this.props.commentID
                        ? this.updateComment(e)
                        : this.addComment(e))}
        >
          Save
        </button>
      </div>
    );
  }
}


// map redux state to component props
function mapStateToProps({ comments }) {
  return { comments };
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    handleAddComment: (data) => dispatch(addCommentToServer(data)),
    handleUpdateComment: (data) => dispatch(updateCommentToServer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
