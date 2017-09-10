import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Post from './components/Post'
import { connect } from 'react-redux'
import { addPost, getComments } from './actions'
import ViewPost from './components/ViewPost'
import { withRouter } from 'react-router'

class App extends Component {

  state= {
    addPostModalOpen:false
  }

  componentWillMount() {
    this.props.posts.forEach(post => {
      this.props.handleGetCommentsForPost(post.id)
    })
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
        <div className="App-header">
          <h2>Readable</h2>
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
        </div>

        <Route exact path='/' render={() =>
          <div>
            {this.renderPosts()}
          </div>
        }/>

        <Route exact path='/post/:post_id' render={({match}) =>
          <div>
            <ViewPost postID={match.params.post_id} />
          </div>
        }/>

        <Route
          path='/category/:category'
          exact
          render={({match}) =>
            <div>
              {this.renderPosts(match.params.category)}
            </div>
          }
        />

        <button
          className="btn"
          onClick={() => {this.setState({addPostModalOpen: true})}}
        >
          Add Post
        </button>
        { this.state && this.state.addPostModalOpen && (
          <ViewPost />
        )}
      </div>
    );
  }
}

// map redux state to component props
function mapStateToProps({ posts, categories }) {

 return { posts, categories};
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    addPostTrigger: (data) => dispatch(addPost(data)),
    handleGetCommentsForPost: (data) => dispatch(getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
