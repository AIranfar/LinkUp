import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { thunkGetAllPosts } from "../../store/posts";
import CreateNewPost from "../CreateNewPost";
import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../DeletePostModal";
import EditPostModal from "../EditPostModal";
import CreateNewComment from "../CreateNewComment";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";
import AddorRemoveLikes from "../AddorRemoveLikes";
import { thunkGetComments } from "../../store/comments";
import { thunkGetLikes } from "../../store/likes";
import { thunkGetAllUsers } from "../../store/user";
import "./AllPosts.css";

const AllPosts = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allPosts = Object.values(useSelector((state) => state.allPosts.allPosts));
    const sessionUser = useSelector((state) => state.session.user);
    const allComments = Object.values(useSelector((state) => state.allComments.allComments));
    const allLikes = useSelector((state) => state.allLikes.allLikes);
    const allLikesArr = Object.values(allLikes)
    const allUsers = useSelector((state) => state.singleUser.allUsers);
    const allUsersArr = Object.values(allUsers || {})
    const [openCommentId, setOpenCommentId] = useState(null);

    // console.log('ALLLikes-->', allLikes)
    // console.log('ALLUSERS-->', allUsersArr)

    const toggleComments = (postId) => {
        setOpenCommentId((prevOpenCommentId) => (prevOpenCommentId === postId ? false : postId));
    };

    useEffect(() => {
        dispatch(thunkGetAllUsers());
        dispatch(thunkGetLikes());
        dispatch(thunkGetAllPosts());
        dispatch(thunkGetComments());
    }, [dispatch]);

    const formatDate = (date) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const matchingComments = (postId) => {
        return allComments.filter((comment) => comment?.post_id === postId);
    };

    const getCommentCount = (postId) => {
        return matchingComments(postId).length;
    };

    const renderPostActions = (post) => {
        if (sessionUser.id === post.user_id) {
            return (
                <div className="post-edit-delete-container">
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                        modalComponent={<EditPostModal postId={post.id} />}
                        className="edit-pencil-symbol"
                    />
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-trash-can"></i>}
                        modalComponent={<DeletePostModal postId={post.id} />}
                        className="delete-trashcan-symbol"
                    />
                </div>
            );
        }
        return null;
    };

    const renderLikes = (postId) => {
        const postLikes = allLikesArr.filter((like) => like.post_id === postId);

        if (postLikes.length === 0) {
          return null;
        } else if (postLikes.length === 1) {
          const userId = postLikes[0].user_id;
          const userLiked = allUsersArr.find((user) => user.id === userId);

          if (userLiked) {
            return `${userLiked.first_name} ${userLiked.last_name} likes this post`;
          }
        } else {
          const firstUserId = postLikes[0]?.user_id;
          const firstUserLiked = allUsersArr.find((user) => user.id === firstUserId);

          if (firstUserLiked) {
            const { first_name, last_name } = firstUserLiked;
            const remainingLikes = postLikes.length - 1;
            return `${first_name} ${last_name} and ${remainingLikes} ${remainingLikes === 1 ? 'other' : 'others'} liked this post`;
          }
        }
      };



    if (!allComments || !allUsers) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {sessionUser && (
                <div className="all-posts-container-wrapper">
                    <div className="create-new-post-container">
                        <img src={sessionUser.profile_image} className="new-post-profile-picture" />
                        <OpenModalButton
                            className="create-new-post-button"
                            buttonText="Start a post"
                            modalComponent={<CreateNewPost />}
                        />
                    </div>
                    <div className="feed-divider"></div>
                    <div className="all-posts-container">
                        {allPosts.reverse().map((post) => (
                            <div key={post.id} className="single-post">
                                {/* {console.log('POST USER ID->', post)} */}
                                <div className="post-header">
                                    <div className="post-user-info">
                                        <img onClick={() => history.push(`/user/${post.user_id}`)} src={post.owner_profile_picture} className="post-profile-picture" />
                                        <div className="post-user-name-created-at">
                                            <div onClick={() => history.push(`/user/${post.user_id}`)} className="post-first-last-name">
                                                {post.owner_first_name} {post.owner_last_name}
                                            </div>
                                            <p className="post-created-at">{formatDate(post.created_at)}</p>
                                        </div>
                                    </div>
                                    {renderPostActions(post)}
                                </div>
                                <div className="single-post-body">{post.post_body}</div>
                                <img src={post.image} className="all-posts-image" />
                                <div>
                                        <div
                                            className="post-likes-comments-counter"
                                        >
                                            <div className="render-like-names">
                                                {renderLikes(post.id)}
                                            </div>
                                            <button
                                                className='open-comment-section-button-numbered'
                                                onClick={() => toggleComments(post.id)}>
                                                {getCommentCount(post.id)} {getCommentCount(post.id) === 1 ? 'comment' : 'comments'}
                                            </button>
                                        </div>
                                    <div className="likes-comment-container">
                                        <AddorRemoveLikes post={post} />
                                        <button
                                            className='open-comment-section-button'
                                            onClick={() => toggleComments(post.id)}>
                                            <i className="fa-regular fa-comment-dots"></i> Comment
                                        </button>
                                    </div>
                                    {openCommentId === post.id && (
                                        <div>
                                            <p
                                            className="new-comment-button-container"
                                            >
                                                <img src={sessionUser.profile_image} className="new-comment-profile-picture" />
                                                <OpenModalButton
                                                    className='create-new-comment-button'
                                                    buttonText="Add a comment..."
                                                    modalComponent={<CreateNewComment postId={post.id} />}
                                                />
                                            </p>
                                            {matchingComments(post.id).reverse().map((comment) => (
                                                <div className="post-comments-container">
                                                    <div className="comment-container-user-info">
                                                        <div className="comment-container-image-name">
                                                            <img
                                                                src={comment.comment_owner_profile_picture}
                                                                alt="post-profile-image"
                                                                className="post-profile-picture"
                                                            />
                                                            <div className="comment-name-date-comment-body">
                                                                <div className="comment-user-name">
                                                                    {comment.comment_owner_first_name} {comment.comment_owner_last_name}
                                                                </div>
                                                                <div className="single-comment-date">
                                                                    {formatDate(comment.created_at)}
                                                                </div>
                                                                <div className='post-comment-body'>
                                                                    {comment.comment_body}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {sessionUser.id === comment.user_id && (
                                                            <div className="comment-edit-delete-container">
                                                                <OpenModalButton
                                                                    buttonText={<i className="fa-regular fa-pen-to-square edit-pencil-symbol"></i>}
                                                                    modalComponent={<EditCommentModal commentId={comment.id} />}
                                                                    className="edit-pencil-symbol"
                                                                />
                                                                <OpenModalButton
                                                                    buttonText={<i className="fa-regular fa-trash-can delete-trashcan-symbol"></i>}
                                                                    modalComponent={<DeleteCommentModal commentId={comment.id} />}
                                                                    className="delete-trashcan-symbol"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPosts;
