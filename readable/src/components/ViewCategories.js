import React, { Component } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import Post from './Post';
import AddPost from './AddPost';

class ViewCategories extends Component {

  state= {
    addPostModalOpen: false,
    sortBy: 'voteScore'
  }

  renderPosts = (category) => {
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
    if (posts) {
      return Object.keys(posts[0]).map(key => {
        if (key !== 'id' && key !== 'deleted') {
          return {
            value: key,
            label: key
          };
        }
        return {};
      })
    }
    return {}
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
                  sortBy: selected ? selected.value : ''
                })}
              value={this.state.sortBy}
              options={this.sortOptions(this.props.posts)}
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
  posts = posts.filter(post => !post.deleted);
  return { posts };
}

export default connect(mapStateToProps, null)(ViewCategories);
