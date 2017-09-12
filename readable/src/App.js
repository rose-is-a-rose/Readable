import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getComments } from './actions';
import './App.css';
import Post from './components/Post';
import ViewPost from './components/ViewPost';
import ViewCategories from './components/ViewCategories';

class App extends Component {

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
    handleGetCommentsForPost: (data) => dispatch(getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
