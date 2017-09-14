import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Post from './Post';
import AddPost from './AddPost';

/**
 * Component that displays all categories and all active posts.
 */
class ViewCategories extends Component {

  state= {
    addPostModalOpen: false,
    sortBy: 'voteScore'
  }

  /**
   * Render Posts.
   * If a category is specified, then filter posts down in that category.
   * Sort those post based on sorting selection
   * Then render post component.
   * @param {category} if given, then only render the posts under that category
   */
  renderPosts = (category) => {
    return (
      this.sortPosts(this.filterPostsByCategory(this.props.posts, category), this.state.sortBy)
      .map(post =>
        <Post key={post.id} postID={post.id}/>
      )
    )
  }

  /**
   * Filter Posts by category.
   * If a category is specified, then filter posts down in that category.
   * @param {posts} Array of posts.
   * @param {category}
   */
  filterPostsByCategory = (posts, category) => (
    posts.filter(post =>
      category ? post.category === category : true
    )
  )

  /**
   * Sort posts based on sortBy selection value.
   * @param {posts} Array of posts.
   * @param {sortBy} The key of the post object to sort on.
   */
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

  /**
   * The sorting options
   * will filter out id or deleted keys. but will return all other keys from a post.
   * @param {posts} Array of posts.
   */
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
