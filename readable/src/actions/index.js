export const ADD_POST = 'ADD_POST';
// export const REMOVE_FROM_CALENDAR = 'ADD_REMOVE_FROM_CALENDARRECIPE';

export const addPost = ({ postTitle, postBody, author }) => {

	console.log(postTitle, postBody, author);
	return {
		type: ADD_POST,
		postTitle,
		postBody,
		author
	}
}
