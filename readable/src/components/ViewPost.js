import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPostToServer } from '../actions'
import Post from '../components/Post'
import Comment from '../components/Comment'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

class ViewPost extends Component {

  constructor (props){
    super(props);
  }

  state = {
    addCommentModalOpen: false
  }

  getPostDetailFromStore = () => {
    return this.props.posts.find((post) => (
      post.id === this.props.postID
    ));
  }

  getCommentForPost = (postID) => {
    return (this.props.comments && this.props.comments[postID]) || [];
  }

  render() {
    const post = this.getPostDetailFromStore();
    return (
      <div>
        <Post post={post} />
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
          Hello
        </Modal>
      </div>

    );
  }
}

// map redux state to component props
function mapStateToProps({ posts, comments }) {
  debugger
 return { posts, comments };
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    handleAddPost: (data) => dispatch(addPostToServer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
