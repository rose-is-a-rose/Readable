import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import { connect } from 'react-redux';
import AddPost from './AddPost';
import Modal from 'react-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ViewCategories extends Component {

  state= {
    addPostModalOpen: false,
    sortBy: ''
  }

  renderPosts = (category) => {
    debugger
    return (
      this.sortPosts(this.filterPostsByCategory(this.props.posts, category), this.state.sortBy)
      .map(post =>
        <Post key={post.id} post={post}/>
      )
    )
  }

  filterPostsByCategory = (posts, category) => (
    posts.filter(post =>
      category ? post.category === category : true
    )
  )

  sortPosts = (posts, sortBy = '') => {
    debugger
    if (sortBy) {
      return posts.sort((postA, postB) => {
        if (postA[sortBy] > postB[sortBy]) {
          return 1;
        } else if (postA[sortBy] < postB[sortBy]) {
          return -1;
        } else {
          return 0;
        }
      }
      );
    }
    return posts;
  }

  sortOptions = (posts) => {
    return Object.keys(posts[0]).map(key => {
      return key !== 'id' && key !== 'deleted' && {
          value: key,
          label: key
        } || {}
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="right full-width col s6 m4 l4">
            <label>Sort By</label>
            <Select
              onChange={selected =>
                this.setState({
                  sortBy: selected.value
                })}
              options={this.sortOptions(this.filterPostsByCategory(this.props.posts, this.props.category))}
            >
            </Select>
          </div>
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
function mapStateToProps({ posts }) {

 return { posts };
}

export default connect(mapStateToProps, null)(ViewCategories);
