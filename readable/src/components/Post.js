import React, {Component} from 'react'

function convertTimestampToDateTime (timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
}

export default function Post ({ post }) {

	return (
    <div className="card blue-grey lighten-4">
      <div className="card-content">
        <span className="orange-text text-darken-2 right">
          {convertTimestampToDateTime(post.timestamp)}
          <br/>
          Vote: {post.voteScore}
        </span>
        <p>
          <a
            href={`/post/${post.id}`}
            className="card-title orange-text text-darken-4"
          >
            {post.category} - {post.title}
          </a>
        </p>
        <p className="grey-text text-darken-4">
          Author: {post.author}
        </p>
        <blockquote className="grey-text text-darken-4">
          <p className="flow-text">
            {post.body}
          </p>
        </blockquote>
      </div>
    </div>
	)
}