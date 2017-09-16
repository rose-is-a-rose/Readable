import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import { addPostToServer } from '../actions/PostActions'
import Post from '../components/Post'
import Comment from '../components/Comment'
import AddComment from '../components/AddComment'

/**
 * Component that displays a post and its comments.
 */
class ViewPost extends Component {

  state = {
    addCommentModalOpen: false
  }

  /**
   * Get Post detail from store
   */
  getPostDetailFromStore = () => {
    return this.props.posts.find((post) => (
      post.id === this.props.postID
    ));
  }

  /**
   * Get comments from store for a specific post
   * @param {postID} The ID of the post
   */
  getCommentForPost = (postID) => {
    const comments =
      this.props.comments && this.props.comments[postID];
    let nonDeletedComments = [];
    if (comments) {
      nonDeletedComments = comments.filter(c => !c.deleted);
    }
    return nonDeletedComments;
  }

  render() {
    const post = this.getPostDetailFromStore();
    return (
      <div>
        <Post postID={post.id} />
        { this.getCommentForPost(post.id).map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        }
        <div className="right-align">
          <button
            className="btn"
            onClick={() => {this.setState({addCommentModalOpen: true})}}
          >
            Add Comment
          </button>
        </div>
        <Modal contentLabel="Modal"
          isOpen={this.state.addCommentModalOpen}
          onRequestClose={()=> this.setState({addCommentModalOpen: false})}
        >
          <AddComment postID={this.props.postID} closeModal={()=>this.setState({addCommentModalOpen: false})}/>
        </Modal>
      </div>

    );
  }
}

// map redux state to component props
function mapStateToProps({ posts, comments }) {
  posts = posts.filter(post => !post.deleted);
  return { posts, comments };
}

export default connect(mapStateToProps, { addPostToServer })(ViewPost);
