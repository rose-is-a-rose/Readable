import {
	ADD_POST,
	ADD_COMMENTS,
	DELETE_COMMENTS,
	UPDATE_COMMENT
} from '../actions';

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
      const { deletedComment } = action;

      let siblingComments = state.comments[deletedComment.parentId];

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
    case UPDATE_COMMENT :
      const { id, body, timestamp, parentId } = action.comment;

      siblingComments = state.comments[parentId];
      const commentToUpdate = siblingComments.find(c =>
      	c.id === id
    	);
      commentToUpdate.body = body;
      commentToUpdate.timestamp = timestamp;

      return {
        ...state,
        comments: {
        	...state.comments,
        	[parentId]: siblingComments
      	}
      }
    default :
      return state
  }

}

