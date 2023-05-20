import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../store/posts";
import CreateNewPost from "../CreateNewPost";
import OpenModalButton from '../OpenModalButton';
import DeletePostModal from '../DeletePostModal';
import EditPostModal from '../EditPostModal';
import { thunkGetComments } from "../../store/comments";
import './AllPosts.css'

const GetAllPosts = () => {
    const dispatch = useDispatch();
    const allPosts = Object.values(useSelector((state) => state.allPosts.allPosts))
    // console.log('ALLPOSTS', allPosts)
    const sessionUser = useSelector((state) => state.session.user);
    const allComments = Object.values(useSelector((state) => state.allComments.allComments))
    console.log('ALLCOMMENTS->', allComments)


    useEffect(() => {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetComments())
    }, [dispatch])

    if (!allComments) {
        return <div>Loading comments...</div>;
    }

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

    const matchingComments = (postId) => {
        return allComments.filter(comment => comment.post_id === postId);
    };

    return (
        <div>
            <div>
                <OpenModalButton buttonText="Create a new post" modalComponent={<CreateNewPost />} />
            </div>
            <div className="all-posts-container">
                {allPosts.map((post) => {
                    return (
                        <div>
                            <div>
                                {console.log('EACHPOST->', post)}
                                <div className="single-post">
                                    {sessionUser.id === post.user_id ?
                                        <div>
                                            <OpenModalButton buttonText="Delete Post" modalComponent={<DeletePostModal postId={post.id} />} />
                                            <OpenModalButton buttonText="Edit Post" modalComponent={<EditPostModal postId={post.id} />} />
                                        </div> : null}
                                    {post.post_body}
                                    {formatDate(post.created_at)}
                                    {<img src={post.image} className="all-posts-image" />}
                                    {matchingComments(post.id).map((comment) => {
                                        return (
                                            <p>
                                                {comment.comment_body}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GetAllPosts;
