import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteCommentToServer } from '../actions'

function convertTimestampToDateTime (timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
}

// const Comment = ({ comment }) => {
class Comment extends Component {

	render() {

    const { comment } = this.props;

    return (
      <div className="card blue-grey lighten-5">
        <div className="card-content">
          <span className="card-title">
            COMMENT
          </span>
          <span className="orange-text text-darken-2 right">
            {convertTimestampToDateTime(comment.timestamp)}
            <br/>
            Vote: {comment.voteScore}
          </span>
          <blockquote>{comment.body}</blockquote>
          <p>Author: {comment.author}</p>
          <div className="right-align">
            <button
              className="btn"
              onClick={()=>this.props.handleDeleteComment(comment.id)}
            >
              Delete
            </button>
            <button className="btn">
              Edit
            </button>
          </div>
        </div>
      </div>
  	)
  }
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    handleDeleteComment: (data) => dispatch(deleteCommentToServer(data))
  }
}

export default connect(null, mapDispatchToProps)(Comment);