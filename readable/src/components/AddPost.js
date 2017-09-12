import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPostToServer } from '../actions'
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'

class AddPost extends Component {

  state= {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    category: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleAddPost({
      title:this.state.title,
      body:this.state.body,
      author:this.state.author,
      category: this.state.category,
      timestamp: new Date().getTime(),
      id: require("uuid").v4()
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s6 m4 l4">
            <h4>Add a Post</h4>
          </div>
          <div className="col s6 m8 l8">
            <ReactMaterialSelect
              label="Post Category"
              defaultValue={this.state.category}
              onChange={(selected) => {
                this.setState({
                  category: selected.value
                })}}
            >
            {this.props.categories.map(category => (
              <option key={category.name} dataValue={category.name}>
                {category.name}
              </option>
            ))}
            </ReactMaterialSelect>
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
          <label htmlFor="title">Post Title</label>
        </div>
        <div className="input-field">
          <textarea
            id="body"
            className="materialize-textarea"
            onChange={(e) => this.setState({
              body: e.target.value
            })}
            value={this.state.body}
          ></textarea>
          <label htmlFor="body">Post Body</label>
        </div>
        <div className="input-field">
          <input
            id="author"
            type="text"
            onChange={(e) => this.setState({
              author: e.target.value
            })}
            value={this.state.author}
          />
          <label htmlFor="author">Post Author</label>
        </div>
        <button
          className="btn"
          onClick={(e) => this.handleSubmit(e)}
        >
          Add Post
        </button>
      </div>
    );
  }
}

// map redux state to component props
function mapStateToProps({ categories }) {
 return { categories };
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    handleAddPost: (data) => dispatch(addPostToServer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
