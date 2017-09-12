import {
	addNewPost,
	getCommentsForPost,
	addNewComment,
	deleteComment,
	updateComment
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENTS = 'DELETE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

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
export const updateCommentToStore = ( comment ) => (
	{
		type: UPDATE_COMMENT,
		comment
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

export const updateCommentToServer = ( comment ) => dispatch => (
  updateComment(comment).then((res) => {
		dispatch(updateCommentToStore(res))
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

