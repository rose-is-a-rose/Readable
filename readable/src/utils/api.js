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


// POST /comments
//   USAGE:
//     Add a comment to a post

//   PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
//     author: String
//     parentId: Should match a post id in the database.
export const addNewComment = (comment) => (
  fetch(`${api}/comments`, { headers, method: 'POST', body: JSON.stringify(comment)})
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


// DELETE /comments/:id
//   USAGE:
//     Sets a comment's deleted flag to 'true'

export const deleteComment = (commentID) => (
	fetch(`${api}/comments/${commentID}`, { headers, method: 'DELETE' })
  .then((res) => res.json())
)
