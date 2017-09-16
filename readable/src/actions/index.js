import {
	addNewPost,
	getCommentsForPost,
	addNewComment,
	deleteComment,
	updateComment,
	votePost,
	deletePost,
	updatePost
} from '../utils/api';
import {
	ADD_POST,
	ADD_COMMENTS,
	DELETE_COMMENTS,
	UPDATE_COMMENT,
	UPVOTE_POST,
	DOWNVOTE_POST,
	DELETE_POST,
	UPDATE_POST
} from './types';

/**
 * Action creator for adding post.
 * @param {post} Post Object
 */
export const addPost = ( post ) => (
 {
		type: ADD_POST,
		post
	}
)

/**
 * Action creator for adding comments for a post.
 * @param {postID} Post ID
 * @param {comments} Array of comments
 */
export const addCommentsToStore = ( postID, comments ) => (
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
export const updateCommentToStore = ( comment ) => (
	{
		type: UPDATE_COMMENT,
		comment
	}
)

/**
 * Action creator for updating comment.
 * @param {comment}
 */
export const updatePostToStore = ( post ) => (
	{
		type: UPDATE_POST,
		post
	}
)

/**
 * Action creator for deleting comment
 * @param {deletedComment} The comment object to delete
 */
export const deleteComments = ( deletedComment ) => (
	{
		type: DELETE_COMMENTS,
		deletedComment
	}
)

/**
 * Action creator for upvoting a post
 * @param {post} Post Object
 */
export const upVotePostToStore = ( post ) => (
	{
		type: UPVOTE_POST,
		post
	}
)

/**
 * Action creator for downvoting a post
 * @param {post} Post Object
 */
export const downVotePostToStore = ( post ) => (
	{
		type: DOWNVOTE_POST,
		post
	}
)

/**
 * Action creator for deleting a post
 * @param {id} Post ID
 */
export const deletePostToStore = ( id ) => (
	{
		type: DELETE_POST,
		post: {id}
	}
)

/**
 * Function to add post to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {post} Post Object
 */
export const addPostToServer = ( post ) => dispatch => (
	addNewPost(post).then((res) => {
		dispatch(addPost(res))
	})
)

/**
 * Function to delete post to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {postID} Post ID
 */
export const deletePostToServer = ( postID ) => dispatch => (
	deletePost(postID).then((res) => {
		debugger
		dispatch(deletePostToStore(postID))
	})
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
 * Function to update post to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {post} Post Object
 */
export const updatePostToServer = ( post ) => dispatch => (
  updatePost(post).then((res) => {
		dispatch(updatePostToStore(post))
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
 * Function to update post to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {post} Post Object
 */
export const upVotePostToServer = ( postID ) => dispatch => (
	votePost({id: postID, votingType: 'upVote'}).then((res) => {
		dispatch(upVotePostToStore(res))
	})
)

/**
 * Function to downvote post to server through API call.
 * then triggers action creator to update the store.
 *
 * @param {postID} Post ID
 */
export const downVotePostToServer = ( postID ) => dispatch => (
	votePost({id: postID, votingType: 'downVote'}).then((res) => {
		dispatch(downVotePostToStore(res))
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

