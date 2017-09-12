import {
	addNewPost,
	getCommentsForPost,
	addNewComment,
	deleteComment
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENTS = 'DELETE_COMMENTS';

export const addPost = ( post ) => (
 {
		type: ADD_POST,
		post
	}
)

export const addComments = ( postID, comments ) => (
	{
		type: ADD_COMMENTS,
		postID,
		comments
	}
)

export const deleteComments = ( deletedComment ) => (
	{
		type: DELETE_COMMENTS,
		deletedComment
	}
)

export const addPostToServer = ( post ) => dispatch => (
	addNewPost(post).then((res) => {
		dispatch(addPost(res))
	})
)

export const addCommentToServer = ( comment ) => dispatch => (
  addNewComment(comment).then((res) => {
		dispatch(addComments(comment.parentId, res))
	})
)

export const deleteCommentToServer = ( commentID ) => dispatch => (
	deleteComment(commentID).then((res) => {
		dispatch(deleteComments(res))
	})
)

export const getComments = ( postID ) => dispatch => {
	getCommentsForPost(postID).then(res => {
		dispatch(addComments(postID, res));
	})
}

