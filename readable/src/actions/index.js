import { addNewPost, getCommentsForPost, addNewComment } from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';

export const addPost = (post) => {
	return {
		type: ADD_POST,
		post
	}
}

export const addComments = ( postID, comments) => {
	return {
		type: ADD_COMMENTS,
		postID,
		comments
	}
}

export const addPostToServer = (post) => dispatch => (
	addNewPost(post).then((res) => dispatch(addPost(res)))
)

export const addCommentToServer = (comment) => dispatch => {
	debugger
	return addNewComment(comment).then((res) => {
		debugger
		dispatch(addComments(comment.parentId, res))
	})

}

export const getComments = (postID) => dispatch => {
	getCommentsForPost(postID)
	.then(res => {
		dispatch(addComments(postID, res));
	})
}

