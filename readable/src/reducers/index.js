// import { combineReducers } from 'redux'
import { ADD_POST, ADD_COMMENTS } from '../actions';

export default ( state = {}, action) => {

  switch (action.type) {
    case ADD_POST :
      const { post } = action;

      return {
        ...state,
        posts: [
        	...state.posts,
        	post
      	]
      }
    case ADD_COMMENTS :
      if (!state.comments) {
      	state.comments = {};
    	}
    	if (!state.comments[action.postID]) {
    		state.comments[action.postID] = [];
    	}
      return {
        ...state,
        comments: {
        	...state.comments,
        	[action.postID]: state.comments[action.postID].concat(action.comments)
      	}
      }
    default :
      return state
  }

}

// export default combineReducers({
//   posts
// })
