import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Post from './components/Post'
import { connect } from 'react-redux'
import { addPost, getComments } from './actions'
import ViewPost from './components/ViewPost'
import AddPost from './components/AddPost'
import ViewCategories from './components/ViewCategories'
import { withRouter } from 'react-router'
import Modal from 'react-modal';

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
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">Readable</Link>
            <ul id="nav-mobile" className="right">
              {this.props.categories && this.props.categories.map(c =>
                <li key={c.name}>
                  <Link to={`/category/${c.path}`}>
                    {c.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Route exact path='/' render={() =>
          <ViewCategories />
        }/>

        <Route exact path='/post/:post_id' render={({match}) =>
          <ViewPost postID={match.params.post_id} />
        }/>

        <Route
          path='/category/:category'
          exact
          render={({match}) =>
            <ViewCategories category={match.params.category} />
          }
        />
      </div>
    );
  }
}

// map redux state to component props
function mapStateToProps({ posts, categories }) {

 return { posts, categories };
}

// map dispatch methods to component props
function mapDispatchToProps(dispatch) {
  return {
    addPostTrigger: (data) => dispatch(addPost(data)),
    handleGetCommentsForPost: (data) => dispatch(getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
