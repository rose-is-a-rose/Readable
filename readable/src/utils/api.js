export function fetchCategories() {
 return fetch(`http://localhost:5001/categories`, { headers: { 'Authorization': 'Authorization' }})
  .then((res) => res.json())
}

/**
GET /:category/posts
USAGE: Get all of the posts for a particular category
**/
export function fetchPosts(category) {
 return category
 	? fetch(`http://localhost:5001/${category}/posts`,
	 	{ headers: { 'Authorization': 'Authorization' }})
	  .then((res) => res.json())
	: fetch(`http://localhost:5001/posts`,
	 	{ headers: { 'Authorization': 'Authorization' }})
	  .then((res) => res.json())
}