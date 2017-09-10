import { combineReducers } from 'redux'

export default ( state = {}, action) => {

  switch (action.type) {
    case 'ADD_POST' :
      const { post } = action;

      return {
        ...state,
        posts: [
        	...state.posts,
        	post
      	]
      }
    case 'ADD_COMMENTS' :
          debugger
      // const { post } = action;
      if (!state.comments) {
      	state.comments = {};
    	}
      return {
        ...state,
        comments: {
        	...state.comments,
        	[action.postID]: action.comments
      	}
      }
    default :
      return state
  }

}

// export default combineReducers({
//   posts
// })
