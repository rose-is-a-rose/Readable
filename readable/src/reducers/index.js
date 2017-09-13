import {
	ADD_POST,
	ADD_COMMENTS,
	DELETE_COMMENTS,
	UPDATE_COMMENT,
	UPVOTE_POST,
	DOWNVOTE_POST,
	DELETE_POST
} from '../actions';

export default ( state = {}, action) => {
  const { post } = action;

  switch (action.type) {
    case ADD_POST :

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

    case UPVOTE_POST :
      state.posts.find(p =>
      	p.id === post.id
    	).voteScore++;

      return {
        ...state
      }
    case DOWNVOTE_POST :
      state.posts.find(p =>
      	p.id === post.id
    	).voteScore--;

      return {
        ...state
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

    case DELETE_POST:
      const comments = state.comments[post.id];
      if (comments) {
	      comments.forEach(comment =>
	      	comment.deleted = true
	      )
      }
      const deletedPost = state.posts.find(p =>
      	p.id === post.id
    	);
      deletedPost.deleted = true;

      return {
        ...state,
        comments: {
        	...state.comments
        },
        posts: [
        	...state.posts
        ]
      }
    default :
      return state
  }

}

