import { addNewPost, getCommentsForPost } from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';

export const addPost = (post) => {
	return {
		type: ADD_POST,
		post
	}
}

export const addComments = ( postID,comments) => {
	return {
		type: ADD_COMMENTS,
		postID,
		comments
	}
}

export const addPostToServer = (post) => dispatch => (
	addNewPost(post).then((res) => dispatch(addPost(res)))
)

export const getComments = (postID) => dispatch => {
	debugger
	getCommentsForPost(postID)
	.then(res => { debugger;
		dispatch(addComments(postID, res));
	})
}

