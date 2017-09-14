import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal';
import { downVotePostToServer, upVotePostToServer, deletePostToServer } from '../actions'
import AddPost from '../components/AddPost'

function convertTimestampToDateTime (timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
}

class Post extends Component {
  state = {
    editPostModalOpen: false
  }

  render() {
    const { postID, posts } = this.props;
    const post = posts.find(p => p.id === postID);

    return (
      <div className="card blue-grey lighten-4">
        <div className="card-content">
          <span className="orange-text text-darken-2 right">
            {convertTimestampToDateTime(post.timestamp)}
            <br/>
            Vote: {post.voteScore}
          </span>
          <p>
            <a
              href={`/post/${post.id}`}
              className="card-title orange-text text-darken-4"
            >
              {post.category} - {post.title}
            </a>
          </p>
          <p className="grey-text text-darken-4">
            Author: {post.author}
          </p>
          <blockquote className="grey-text text-darken-4">
            <p className="flow-text">
              {post.body}
            </p>
          </blockquote>
          <div className="row">
            <div className="col s3 m3 l3">
              <button
                className="btn full-width"
                onClick={()=>this.props.handleUpvoteComment(post.id)}
              >
                Upvote
              </button>
            </div>
            <div className="col s3 m3 l3">
              <button className="btn full-width"
                onClick={()=>this.props.handleDownvoteComment(post.id)}
              >
                Downvote
              </button>
            </div>
            <div className="col s3 m3 l3">
              <button className="btn full-width"
                onClick={()=>this.props.handleDeletePost(post.id)}
              >
                Delete
              </button>
            </div>
            <div className="col s3 m3 l3">
              <button
                className="btn full-width"
                onClick={()=>this.setState({editPostModalOpen: true})}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <Modal contentLabel="Modal"
          isOpen={this.state.editPostModalOpen}
          onRequestClose={()=> this.setState({editPostModalOpen: false})}
        >
          <AddPost postID={post.id} />
        </Modal>
      </div>
  	)
  }
}

// map redux state to component props
function mapStateToProps({ posts }) {
  posts = posts.filter(post => !post.deleted);
  return { posts };
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    handleUpvoteComment: (data) => dispatch(upVotePostToServer(data)),
    handleDownvoteComment: (data) => dispatch(downVotePostToServer(data)),
    handleDeletePost: (data) => dispatch(deletePostToServer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);