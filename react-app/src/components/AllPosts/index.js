import React, { useEffect, useRef, useState } from "react";
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
    const sessionUser = useSelector((state) => state.session.user);
    const allComments = Object.values(useSelector((state) => state.allComments.allComments))
    const ulRef = useRef();
    const [isMenuOpen, setMenuOpen] = useState(false);


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

    const matchingComments = (postId) => {
        return allComments.filter(comment => comment?.post_id === postId);
    };

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleOutsideClick = (e) => {
            if (!ulRef.current.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => document.removeEventListener("click", handleOutsideClick);
    }, [isMenuOpen]);

    const ulClassName = "post-edit-delete" + (isMenuOpen ? "" : " hidden")

    const renderPostActions = (post) => {
        if (sessionUser.id === post.user_id) {
            return (
                <>
                    <i onClick={toggleMenu} className="fa-solid fa-ellipsis"></i>
                    <div className={ulClassName} ref={ulRef}>
                        <div className="post-edit-delete-container">
                                <i className="fa-solid fa-pencil edit-pencil-symbol"></i>
                                <OpenModalButton buttonText="Edit Post" modalComponent={<EditPostModal postId={post.id} />} />
                                <i class="fa-regular fa-trash-can delete-trashcan-symbol"></i>
                                <OpenModalButton buttonText="Delete Post" modalComponent={<DeletePostModal postId={post.id} />} />
                        </div>
                    </div>
                </>
            );
        }
        return null;
    };

    if (!allComments) {
        return <div>Loading comments...</div>;
    }


    return (
        <div>
            {sessionUser ? (
                <div>
                    <div className="create-new-post-container">
                        <img src={sessionUser.profile_image} className="post-profile-picture" />
                        <OpenModalButton className='create-new-post-button' buttonText="Start a post" modalComponent={<CreateNewPost />} />
                    </div>
                    <div className='feed-divider'></div>
                    <div className="all-posts-container">
                        {allPosts.map((post) => {
                            return (
                                <div key={post.id}>
                                    <div className="single-post">
                                        <img src={post.owner_profile_picture} className="post-profile-picture" />
                                        {post.owner_first_name} {post.owner_last_name}
                                        {renderPostActions(post)}
                                        {post.post_body}
                                        {formatDate(post.created_at)}
                                        <img src={post.image} className="all-posts-image" />
                                        <OpenModalButton buttonText="💬 Comment" modalComponent={<CreateNewComment postId={post.id} />} />
                                        {matchingComments(post.id).map((comment) => {
                                            return (
                                                <p key={comment.id}>
                                                    <img src={comment.comment_owner_profile_picture} alt='post-profile-image' className="post-profile-picture" />
                                                    {comment.comment_owner_first_name} {comment.comment_owner_last_name}
                                                    {sessionUser.id === comment.user_id ? (
                                                        <div>
                                                            <OpenModalButton buttonText="Edit Comment" modalComponent={<EditCommentModal commentId={comment.id} />} />
                                                            <OpenModalButton buttonText="Delete Comment" modalComponent={<DeleteCommentModal commentId={comment.id} />} />
                                                        </div>
                                                    ) : null}
                                                    {comment.comment_body}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );

}

export default GetAllPosts;
