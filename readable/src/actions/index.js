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

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENTS = 'DELETE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const addPost = ( post ) => (
 {
		type: ADD_POST,
		post
	}
)

export const addCommentsToStore = ( postID, comments ) => (
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

export const updatePostToStore = ( post ) => (
	{
		type: UPDATE_POST,
		post
	}
)

export const deleteComments = ( deletedComment ) => (
	{
		type: DELETE_COMMENTS,
		deletedComment
	}
)

export const upVotePostToStore = ( post ) => (
	{
		type: UPVOTE_POST,
		post
	}
)

export const downVotePostToStore = ( post ) => (
	{
		type: DOWNVOTE_POST,
		post
	}
)

export const deletePostToStore = ( id ) => (
	{
		type: DELETE_POST,
		post: {id}
	}
)

export const addPostToServer = ( post ) => dispatch => (
	addNewPost(post).then((res) => {
		dispatch(addPost(res))
	})
)

export const deletePostToServer = ( postID ) => dispatch => (
	deletePost(postID).then((res) => {
		debugger
		dispatch(deletePostToStore(postID))
	})
)

export const addCommentToServer = ( comment ) => dispatch => (
  addNewComment(comment).then((res) => {
		dispatch(addCommentsToStore(comment.parentId, res))
	})
)

export const updateCommentToServer = ( comment ) => dispatch => (
  updateComment(comment).then((res) => {
		dispatch(updateCommentToStore(res))
	})
)

export const updatePostToServer = ( post ) => dispatch => (
  updatePost(post).then((res) => {
		dispatch(updatePostToStore(post))
	})
)

export const deleteCommentToServer = ( commentID ) => dispatch => (
	deleteComment(commentID).then((res) => {
		dispatch(deleteComments(res))
	})
)

export const upVotePostToServer = ( postID ) => dispatch => (
	votePost({id: postID, votingType: 'upVote'}).then((res) => {
		dispatch(upVotePostToStore(res))
	})
)

export const downVotePostToServer = ( postID ) => dispatch => (
	votePost({id: postID, votingType: 'downVote'}).then((res) => {
		dispatch(downVotePostToStore(res))
	})
)

export const getComments = ( postID ) => dispatch => {
	getCommentsForPost(postID).then(res => {
		dispatch(addCommentsToStore(postID, res));
	})
}

