import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { thunkEditPost } from "../../store/posts";
import { useParams } from "react-router-dom";
import './EditPostModal.css'

const EditPost = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const postsArr = Object.values(useSelector((state) => state.allPosts.allPosts))
    console.log('EDITPOST', postsArr)
    const singlePost = postsArr.filter((post) => postId == post.id)
    console.log('singlePost-->', singlePost)

    return (
        <h1>Edit Post</h1>
    )
}

export default EditPost;
