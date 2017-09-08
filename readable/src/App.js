import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Post from './components/Post'
import { connect } from 'react-redux'
import { addPost } from './actions'
import { withRouter } from 'react-router'

class App extends Component {

  renderPosts = (category) => {
    debugger
    return (
      this.props.posts
      .filter(post =>
        category ? post.category === category : true
      ).map(post =>
        <Post key={post.id} post={post}/>
      )
    )
  }

  // sortPosts = (sortBy = 'voteScore') => {
  //   this.setState(prevState => (
  //     { posts: prevState.posts.sort((el1, el2) =>
  //                el1[sortBy] - el2[sortBy]
  //              )
  //     })
  //   );
  // }

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
          onClick={() => this.props.addPostTrigger(
            { postTitle:'title', postBody: 'body', author:'rose' })}
        >
          Add Post
        </button>

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
    addPostTrigger: (data) => dispatch(addPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
