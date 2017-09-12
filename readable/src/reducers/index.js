// import { combineReducers } from 'redux'
import { ADD_POST, ADD_COMMENTS, DELETE_COMMENTS } from '../actions';

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
    case DELETE_COMMENTS :
    	debugger
      const { deletedComment } = action;

      const siblingComments = state.comments[deletedComment.parentId];

      siblingComments.find(c =>
      	c.id === deletedComment.id
    	).deleted = true

      return {
        ...state,
        comments: {
        	...state.comments,
        	[deletedComment.parentId]: siblingComments
      	}
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
