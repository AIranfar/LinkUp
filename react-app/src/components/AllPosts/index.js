import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../store/posts";
import CreateNewPost from "../CreateNewPost";
import OpenModalButton from '../OpenModalButton';
import DeletePostModal from '../DeletePostModal';
import EditPostModal from '../EditPostModal';
import CreateNewComment from "../CreateNewComment";
import DeleteCommentModal from '../DeleteCommentModal'
import EditCommentModal from '../EditCommentModal'
import { thunkGetComments } from "../../store/comments";
import './AllPosts.css'

const GetAllPosts = () => {
    const dispatch = useDispatch();
    const allPosts = Object.values(useSelector((state) => state.allPosts.allPosts))
    console.log('ALLPOSTS', allPosts)
    const sessionUser = useSelector((state) => state.session.user);
    const allComments = Object.values(useSelector((state) => state.allComments.allComments))
    console.log('ALLCOMMENTS->', allComments)
    // console.log('USER', sessionUser)


    useEffect(() => {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetComments())
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

    if (!allComments) {
        return <div>Loading comments...</div>;
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
                                <div className="single-post">
                                    {<img src={post.owner_profile_picture} className='post-profile-picture' />}
                                    {post.owner_first_name} {post.owner_last_name}
                                    {/* {console.log('EACHPOST->', post)} */}
                                    {sessionUser.id === post.user_id ?
                                        <div>
                                            <OpenModalButton buttonText="Delete Post" modalComponent={<DeletePostModal postId={post.id} />} />
                                            <OpenModalButton buttonText="Edit Post" modalComponent={<EditPostModal postId={post.id} />} />
                                        </div> : null}
                                    {post.post_body}
                                    {formatDate(post.created_at)}
                                    {<img src={post.image} className="all-posts-image" />}
                                    {/* {console.log('POSTID', post.id)} */}
                                    <OpenModalButton buttonText="💬 Comment" modalComponent={<CreateNewComment postId={post.id} />} />
                                    {matchingComments(post.id).map((comment) => {
                                        return (
                                            <p>
                                                {/* {console.log('comment->', comment)} */}
                                                {<img src={comment.comment_owner_profile_picture} className='post-profile-picture' />}
                                                {comment.comment_owner_first_name} {comment.comment_owner_last_name}
                                                {sessionUser.id === comment.user_id ?
                                                    <div>
                                                        <OpenModalButton buttonText="Edit Comment" modalComponent={<EditCommentModal commentId={comment.id} />} />
                                                        <OpenModalButton buttonText="Delete Comment" modalComponent={<DeleteCommentModal commentId={comment.id} />} />
                                                    </div> : null}
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
