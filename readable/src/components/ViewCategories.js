import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import { connect } from 'react-redux';
import AddPost from './AddPost';
import Modal from 'react-modal';

class ViewCategories extends Component {

  state= {
    addPostModalOpen:false
  }

  renderPosts = (category) => {
    return (
      this.props.posts
      .filter(post =>
        category ? post.category === category : true
      ).map(post =>
        <Post key={post.id} post={post}/>
      )
    )
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s3 m3 l3">
            <Link to='/'>
              <button className="btn btn-large">
                home
              </button>
            </Link>
          </div>
          {this.props.categories && this.props.categories.map(c =>
            <div key={c.name} className="col s3 m3 l3">
              <Link to={`/category/${c.path}`}>
                <button className="btn btn-large">
                  {c.name}
                </button>
              </Link>
            </div>
          )}
        </div>

        {this.renderPosts(this.props.category)}

        <button
          className="btn"
          onClick={() => {this.setState({addPostModalOpen: true})}}
        >
          Add Post
        </button>
        <Modal contentLabel="Modal"
          isOpen={this.state.addPostModalOpen}
          onRequestClose={()=> this.setState({addPostModalOpen: false})}
        >
          <AddPost />
        </Modal>
      </div>
    );
  }
}

// map redux state to component props
function mapStateToProps({ posts, categories }) {

 return { posts, categories};
}

export default connect(mapStateToProps, null)(ViewCategories);
