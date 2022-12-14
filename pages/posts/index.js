import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  useGetPostsQuery,
  useIncrementLikeMutation,
} from "../../src/redux/slices/apiSlice";
import { selectId } from "../../src/redux/slices/postSlice";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Content = styled.div`
height: 100%;
background: url('/pbg.png');
&:hover{
  cursor: pointer;
}

h4{
 padding-left: 2%;
 margin-bottom: 0;
 font-style: oblique;
};

/* I was thinking we can Have a cool background image for our Forums Page! */

.postList {
  list-style: none;
  font-size: 1.1em;
  padding: 0;
  color: white;
}

.row{
  border-top: 3px solid #242424;
  /* color: #D5D3D3; */
  padding: 1.5%;
  width: 100%;
  @media only screen and (min-width: 850px) {
    // width: 100%;
    // margin-left: 22.5%;
  }
}

 .footer {
  border-top: 1.5px solid #242424;
  color:#D5D3D3;
  background-color: #242424;
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
 }

 .postTitle {
  padding: 0;
  margin: 4%;
 }

 .postDetails {
  padding: 0;
  margin: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5em;
 }

 .Header {
  text-align: center;
  padding-top: 4%;
 }

 .createPost {
  padding: 2%;
  border: none;
  font-size: 1em;
  background-color: #D5D3D3;
  color:#242424;
 }

 @media only screen and (min-width: 850px) {
  .createPost {
    padding: 1.2%;
  }
}

`;

//I am Assuming I need 

function Posts() {
  const { data: posts } = useGetPostsQuery();
  const [ incrementLike ] = useIncrementLikeMutation();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  async function handleLikes(payload) {
    if (session) {
    await incrementLike(payload)
    } else {
      alert("Please Login To Like Posts!")
    }
  }
  // IDK if we should do getSingleUserQuery like here or create another APIslice to get all Users
  // and then just plug in the ID given from post.userId

  return (
  <Content>
    {/* <Link href={'/posts/createpost'}>
      <div className="Header">
      <button className="createPost">Create Post</button>
      </div>
    </Link> */}
    {posts?.length && posts.map((post) => {
        return (
          <ul key={post.id} className="postList">
          <li className='row'>
              <Link href={{pathname: `/posts/${post.id}`, query: {id: post.id}}}>
              <h4 onClick={() => dispatch(selectId(post.id))}>
                  {post.title}
                </h4>
              </Link>
              <div className="postDetails">
                <div className="postDetail">
               Posted by: {post.username} {post.createdAt}<br></br> </div>
               <div className="postDetail">
               <ThumbUpIcon fontSize="small" onClick={() => handleLikes({id: post.id, payload: {likes: post.likes + 1}})} /> {post.likes}<br></br>
               <ThumbDownIcon fontSize="small" onClick={() => handleLikes({id: post.id, payload: {likes: post.likes - 1}})} /> <br></br>
               </div>
               {/* <div className="postDetail">
              Created At: {post.createdAt}<br></br></div> */}
              {post.comments.length} comments
              </div>
            </li>
          </ul>
    )})}
    <div className="footer">
    <Link href={'/posts/createpost'}>
        <button className="createPost">Create Post</button>
        </Link>
    </div>
  </Content>
  );
}

export default Posts;
