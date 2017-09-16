import {
	addNewPost,
	votePost,
	deletePost,
	updatePost
} from '../utils/api';

import {
	ADD_POST,
	UPVOTE_POST,
	DOWNVOTE_POST,
	DELETE_POST,
	UPDATE_POST
} from './types';

/**
 * Action creator for adding post.
 * @param {post} Post Object
 */
const addPost = ( post ) => (
 {
		type: ADD_POST,
		post
	}
)

/**
 * Action creator for updating comment.
 * @param {comment}
 */
const updatePostToStore = ( post ) => (
	{
		type: UPDATE_POST,
		post
	}
)

/**
 * Action creator for upvoting a post
 * @param {post} Post Object
 */
const upVotePostToStore = ( post ) => (
	{
		type: UPVOTE_POST,
		post
	}
)

/**
 * Action creator for downvoting a post
 * @param {post} Post Object
 */
const downVotePostToStore = ( post ) => (
	{
		type: DOWNVOTE_POST,
		post
	}
)

/**
 * Action creator for deleting a post
 * @param {id} Post ID
 */
const deletePostToStore = ( id ) => (
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
		dispatch(deletePostToStore(postID))
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
