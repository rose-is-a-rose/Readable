import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal';
import { downVotePostToServer, upVotePostToServer, deletePostToServer } from '../actions/PostActions'
import AddPost from '../components/AddPost'

function convertTimestampToDateTime (timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
}

/**
 * Post Component
 */
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
                onClick={()=>this.props.upVotePostToServer(post.id)}
              >
                Upvote
              </button>
            </div>
            <div className="col s3 m3 l3">
              <button className="btn full-width"
                onClick={()=>this.props.downVotePostToServer(post.id)}
              >
                Downvote
              </button>
            </div>
            <div className="col s3 m3 l3">
              <button className="btn full-width"
                onClick={()=>this.props.deletePostToServer(post.id)}
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
          <AddPost postID={post.id} closeModal={() => this.setState({editPostModalOpen: false})}/>
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

export default connect(mapStateToProps, { upVotePostToServer, downVotePostToServer, deletePostToServer })(Post);