import React from 'react'
import Post from './Post'

export default function PostBox(props) {
  const posts = props.posts
  console.log(posts)
  var myView = posts.map((post) =>(
    <li key={post.id} className="span3" style={{height:'100px',margin: '1px'}}>
       <Post post={post}/>
    </li>
  ))
  return (
    <div className="well well-small">
  <h3>Our Posts </h3>
  <div className="row-fluid">
    <ul className="thumbnails">
      {myView}
    </ul>
  </div>
</div>

  )
}
