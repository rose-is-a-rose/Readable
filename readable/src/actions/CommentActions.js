import {
	addNewComment,
	deleteComment,
	updateComment,
	getCommentsForPost
} from '../utils/api';

import {
	ADD_COMMENTS,
	DELETE_COMMENTS,
	UPDATE_COMMENT,
} from './types';

/**
 * Action creator for adding comments for a post.
 * @param {postID} Post ID
 * @param {comments} Array of comments
 */
const addCommentsToStore = ( postID, comments ) => (
	{
		type: ADD_COMMENTS,
		postID,
		comments
	}
)

/**
 * Action creator for updating comment.
 * @param {comment}
 */
const updateCommentToStore = ( comment ) => (
	{
		type: UPDATE_COMMENT,
		comment
	}
)

/**
 * Action creator for deleting comment
 * @param {deletedComment} The comment object to delete
 */
const deleteComments = ( deletedComment ) => (
	{
		type: DELETE_COMMENTS,
		deletedComment
	}
)

/**
 * Function to add comment to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {comment} Comment Object
 */
export const addCommentToServer = ( comment ) => dispatch => (
  addNewComment(comment).then((res) => {
		dispatch(addCommentsToStore(comment.parentId, res))
	})
)

/**
 * Function to update comment to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {comment} Comment Object
 */
export const updateCommentToServer = ( comment ) => dispatch => (
  updateComment(comment).then((res) => {
		dispatch(updateCommentToStore(res))
	})
)

/**
 * Function to delete comment to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {commentID} Comment ID
 */
export const deleteCommentToServer = ( commentID ) => dispatch => (
	deleteComment(commentID).then((res) => {
		dispatch(deleteComments(res))
	})
)

/**
 * Function to get comments of a post from server through API call.
 * then triggers action creator to update those information to the store.
 *
 * @param {postID} Post ID
 */
export const getComments = ( postID ) => dispatch => {
	getCommentsForPost(postID).then(res => {
		dispatch(addCommentsToStore(postID, res));
	})
}
