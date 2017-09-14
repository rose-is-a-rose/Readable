let token = localStorage.token
if (!token)
   token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}
const api = 'http://localhost:5001';


export const fetchCategories = () => (
  fetch(
 		`${api}/categories`,
 		{ headers, method: 'GET' }
	).then((res) => res.json())
)

export const fetchPosts = (category) => (
	category
 	? fetch(
 			`${api}/${category}/posts`,
 			{ headers, method: 'GET' }
		).then((res) => res.json())
	: fetch(
			`http://localhost:5001/posts`,
			{ headers, method: 'GET' }
		).then((res) => res.json())
)

export const addNewPost = (post) => (
  fetch(
  	`${api}/posts`,
  	{ headers, method: 'POST', body: JSON.stringify(post)}
	).then((res) => res.json())
)

export const addNewComment = (comment) => (
  fetch(
  	`${api}/comments`,
  	{ headers, method: 'POST', body: JSON.stringify(comment)}
	).then((res) => res.json())
)

export const getPostDetail = (postID) => (
	fetch(
		`${api}/posts/${postID}`,
		{ headers, method: 'GET' }
	).then((res) => res.json())
)

export const getCommentsForPost = (postID) => (
	fetch(
		`${api}/posts/${postID}/comments`,
		{ headers, method: 'GET' }
	).then((res) => res.json())
)


export const deleteComment = (commentID) => (
	fetch(
		`${api}/comments/${commentID}`,
		{ headers, method: 'DELETE' }
	).then((res) => res.json())
)

export const updateComment = ({id, body, timestamp}) => (
	fetch(
		`${api}/comments/${id}`,
		{
			headers,
			method: 'PUT',
			body: JSON.stringify({body, timestamp})
		}
	).then((res) => res.json())
)


export const updatePost = ({id, body, title}) => (
	fetch(
		`${api}/posts/${id}`,
		{
			headers,
			method: 'PUT',
			body: JSON.stringify({body, title})
		}
	)
)

export const deletePost = (id) => (
	fetch(
		`${api}/posts/${id}`,
		{
			headers,
			method: 'DELETE'
		}
	)
	// .then((res) => { debugger; const result = res.json(); console.log(result); return result})
)

export const votePost = ({id, votingType}) => (
	fetch(
		`${api}/posts/${id}`,
		{
			headers,
			method: 'POST',
			body: JSON.stringify({ option: votingType })
		}
	).then((res) => res.json())
)