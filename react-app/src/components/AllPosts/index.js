import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../store/posts";
import CreateNewPost from "../CreateNewPost";
import OpenModalButton from '../OpenModalButton';
import './AllPosts.css'

const GetAllPosts = () => {
    const dispatch = useDispatch();
    const allPosts = Object.values(useSelector((state) => state.allPosts.allPosts))
    console.log('POSTS', allPosts)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    function formatDate() {
        const date = new Date();
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const month = monthNames[monthIndex];
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    return (
        <div>
            <div>
                <OpenModalButton buttonText="Create a new post" modalComponent={<CreateNewPost />} />
            </div>
            <div className="all-posts-container">
                {allPosts.map((post) => {
                    return (
                        <div className="single-post">
                            {post.post_body}
                            {formatDate(post.created_at)}
                            {<img src={post.image} className="all-posts-image" />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GetAllPosts;