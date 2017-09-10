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
 fetch(`${api}/categories`, { headers, method: 'GET' })
  .then((res) => res.json())
)

export const fetchPosts = (category) => (
	category
 	? fetch(`${api}/${category}/posts`, { headers, method: 'GET' })
	  .then((res) => res.json())
	: fetch(`http://localhost:5001/posts`, { headers, method: 'GET' })
	  .then((res) => res.json())
)

export const addNewPost = (post) => (
  fetch(`${api}/posts`, { headers, method: 'POST', body: JSON.stringify(post)})
	.then((res) => res.json())
)

// GET /posts/:id
//     USAGE:
//       Get the details of a single post
export const getPostDetail = (postID) => (
	fetch(`${api}/posts/${postID}`, { headers, method: 'GET' })
  .then((res) => res.json())
)

// GET /posts/:id/comments
//     USAGE:
//       Get all the comments for a single post
export const getCommentsForPost = (postID) => (
	fetch(`${api}/posts/${postID}/comments`, { headers, method: 'GET' })
  .then((res) => res.json())
)
