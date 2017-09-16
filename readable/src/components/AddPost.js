import React, { Component } from 'react';
import { connect } from 'react-redux'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { addPostToServer, updatePostToServer } from '../actions';

/**
 * Component to add or update post
 */
class AddPost extends Component {

  state= {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    category: ''
  }

  componentDidMount() {
    if (this.props.postID && this.props.posts) {
      const post = this.props.posts.find(post =>
        post.id === this.props.postID
      );
      if (post) {
        this.setState({
          id: post.id,
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category
        })
      };
    }
  }

  /**
   * Add Post
   * @param {e} Event
   */
  addPost = (e) => {
    e.preventDefault()
    this.props.handleAddPost({
      title:this.state.title,
      body:this.state.body,
      author:this.state.author,
      category: this.state.category,
      timestamp: new Date().getTime(),
      id: require("uuid").v4()
    }).then(() => {
      this.props.closeModal();
    })
  }

  /**
   * Update Post
   * @param {e} Event
   */
  updatePost = (e) => {
    e.preventDefault()
    this.props.handleUpdatePost({
      body:this.state.body,
      title: this.state.title,
      id: this.props.postID
    }).then(() => {
      this.props.closeModal();
    })
  }

  /**
   * Return Category Options
   * @return an array of option object.
   */
  categoryOptions = () => {
    if (this.props.categories) {
      return this.props.categories.map(category => {
          return {
            value: category.name,
            label: category.name
          };
      })
    }
    return [{}]
  }

  render() {

    const existingPost = !!this.props.postID;

    return (
      <div>
        <div className="row">
          <div className="col s6 m4 l4">
            <h4>{existingPost ? 'Update Post' : 'Add a Post'}</h4>
          </div>
          <div className="col s6 m8 l8">

            <label>Category</label>
            <Select
              onChange={(selected) =>
                this.setState({
                  category: selected ? selected.value : ''
                })
              }
              value={this.state.category}
              options={this.categoryOptions()}
              disabled={existingPost}
            >
            </Select>
          </div>
        </div>
        <div className="input-field">
          <input
            id="title"
            type="text"
            onChange={(e) => this.setState({
              title: e.target.value
            })}
            value={this.state.title}
          />
          <label htmlFor="title" className="active">Post Title</label>
        </div>
        <div className="input-field">
          <textarea className="materialize-textarea"
            id="body"
            onChange={(e) => this.setState({
              body: e.target.value
            })}
            value={this.state.body}
          ></textarea>
          <label htmlFor="body" className="active">Post Body</label>
        </div>
        <div className="input-field">
          <input
            id="author"
            type="text"
            onChange={(e) => this.setState({
              author: e.target.value
            })}
            value={this.state.author}
            disabled={existingPost}
          />
          <label htmlFor="author" className="active">Post Author</label>
        </div>
        <button
          className="btn"
          onClick={(e) => (this.props.postID
              ? this.updatePost(e)
              : this.addPost(e))}
        >
          Save
        </button>
      </div>
    );
  }
}

// map redux state to component props
function mapStateToProps({ categories, posts }) {
 return { categories, posts };
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    handleAddPost: (data) => dispatch(addPostToServer(data)),
    handleUpdatePost: (data) => dispatch(updatePostToServer(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
