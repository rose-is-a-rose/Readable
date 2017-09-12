import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal';
import { deleteCommentToServer } from '../actions'
import AddComment from '../components/AddComment'

function convertTimestampToDateTime (timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
}

// const Comment = ({ comment }) => {
class Comment extends Component {

  state = {
    editCommentModalOpen: false
  }

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
          <p>Author: {comment.author}</p>
          <blockquote>{comment.body}</blockquote>
          <div className="row">
            <div className="col offset-s6 offset-m6 offset-l6 s3 m3 l3">
              <button
                className="btn full-width"
                onClick={()=>this.props.handleDeleteComment(comment.id)}
              >
                Delete
              </button>
            </div>
            <div className="col s3 m3 l3">
              <button
                className="btn full-width"
                onClick={()=>this.setState({editCommentModalOpen: true})}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <Modal contentLabel="Modal"
          isOpen={this.state.editCommentModalOpen}
          onRequestClose={()=> this.setState({editCommentModalOpen: false})}
        >
          <AddComment commentID={comment.id} postID={comment.parentId} />
        </Modal>
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