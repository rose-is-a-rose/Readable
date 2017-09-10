import React from 'react'

function convertTimestampToDateTime (timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
}

export default function Comment ({ comment }) {

	return (
    <div className="card blue-grey lighten-5">
      <div className="card-content">
        <span className="card-title">
          COMMENT
        </span>
        <span className="orange-text text-darken-2 right">
          {convertTimestampToDateTime(comment.timestamp)}
          <br/>
          Vote: {comment.voteScore}
        </span>
        <blockquote>{comment.body}</blockquote>
        <p>Author: {comment.author}</p>
      </div>
    </div>
	)
}