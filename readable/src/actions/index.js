import {
	addNewPost,
	getCommentsForPost,
	addNewComment,
	deleteComment,
	updateComment,
	votePost
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENTS = 'DELETE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

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

export const addPostToServer = ( post ) => dispatch => (
	addNewPost(post).then((res) => {
		dispatch(addPost(res))
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

