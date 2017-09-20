import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getComments } from './actions/CommentActions';
import './App.css';
import ViewPost from './components/ViewPost';
import ViewCategories from './components/ViewCategories';

class App extends Component {

  componentWillMount() {
    this.props.posts.forEach(post => {
      this.props.getComments(post.id)
    })
  }

  notFoundText = () => (
    <p className="flow-text">
      Oops.. The page you are looking for does not exist.
      <Link to="/"> Return to the main page</Link>
    </p>
  )

  render() {

    const { categories, posts } = this.props;

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo left padding-left-small">Readable</Link>
            <ul id="nav-mobile" className="right">
              {categories && categories.map(c =>
                <li key={c.name}>
                  <Link to={`/category/${c.path}`}>
                    {c.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path='/' render={() =>
            <ViewCategories />
          }/>

          <Route exact path='/post/:post_id' render={({match}) => (
            posts.find(post => post.id === match.params.post_id)
            ? <ViewPost postID={match.params.post_id} />
            : this.notFoundText()
          )
          }/>

          <Route
            path='/category/:category'
            exact
            render={({match}) =>
              <ViewCategories category={match.params.category} />
            }
          />
          <Route
            render={this.notFoundText}
          />
        </Switch>
      </div>
    );
  }
}

// map redux state to component props
function mapStateToProps({ posts, categories }) {
  posts = posts.filter(post => !post.deleted);
  return { posts, categories };
}

export default withRouter(connect(mapStateToProps, { getComments })(App));
