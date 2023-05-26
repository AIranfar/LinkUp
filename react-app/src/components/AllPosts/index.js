import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../store/posts";
import CreateNewPost from "../CreateNewPost";
import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../DeletePostModal";
import EditPostModal from "../EditPostModal";
import CreateNewComment from "../CreateNewComment";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";
import { thunkGetComments } from "../../store/comments";
import "./AllPosts.css";

const AllPosts = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => Object.values(state.allPosts.allPosts));
  const sessionUser = useSelector((state) => state.session.user);
  const allComments = useSelector((state) => Object.values(state.allComments.allComments));
  const [openCommentId, setOpenCommentId] = useState(null);

  console.log('ALLCOMMENTS', allComments)

  const toggleComments = (postId) => {
    setOpenCommentId((prevOpenCommentId) => (prevOpenCommentId === postId ? false : postId));
  };

  useEffect(() => {
    dispatch(thunkGetAllPosts());
    dispatch(thunkGetComments());
  }, [dispatch]);

  function formatDate(date) {
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

  if (!allComments) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      {sessionUser && (
        <div className="all-posts-container-wrapper">
          <div className="create-new-post-container">
            <img src={sessionUser.profile_image} className="post-profile-picture" />
            <OpenModalButton
              className="create-new-post-button"
              buttonText="Start a post"
              modalComponent={<CreateNewPost />}
            />
          </div>
          <div className="feed-divider"></div>
          <div className="all-posts-container">
            {allPosts.map((post) => (
              <div key={post.id} className="single-post">
                <div className="post-header">
                  <div className="post-user-info">
                    <img src={post.owner_profile_picture} className="post-profile-picture" />
                    <div className="post-user-name-created-at">
                      {post.owner_first_name} {post.owner_last_name}
                      <p className="post-created-at">{formatDate(post.created_at)}</p>
                    </div>
                        </div>
                        {renderPostActions(post)}
                    </div>
                    <div className="single-post-body">{post.post_body}</div>
                    <img src={post.image} className="all-posts-image" />
                    <div className="post-footer">
                        <div className='comment-count-section'>
                            <button className='open-comment-section-button' onClick={() => toggleComments(post.id)}>
                                <i className="fa-regular fa-comment-dots"></i> Comment
                            </button>
                            <button className='open-comment-section-button' onClick={() => toggleComments(post.id)}>
                                {getCommentCount(post.id)} comments
                            </button>
                        </div>
                  {openCommentId === post.id && (
                    <>
                      <OpenModalButton
                        buttonText="Add a comment..."
                        modalComponent={<CreateNewComment postId={post.id} />}
                      />
                      {matchingComments(post.id).map((comment) => (
                        <p key={comment.id}>
                          <img
                            src={comment.comment_owner_profile_picture}
                            alt="post-profile-image"
                            className="post-profile-picture"
                          />
                          {comment.comment_owner_first_name} {comment.comment_owner_last_name}
                          {sessionUser.id === comment.user_id && (
                            <div>
                              <OpenModalButton
                                buttonText={<i className="fa-regular fa-pen-to-square edit-pencil-symbol"></i>}
                                modalComponent={<EditCommentModal commentId={comment.id} />}
                              />
                              <OpenModalButton
                                buttonText={<i className="fa-regular fa-trash-can delete-trashcan-symbol"></i>}
                                modalComponent={<DeleteCommentModal commentId={comment.id} />}
                              />
                            </div>
                          )}
                          {comment.comment_body}
                        </p>
                      ))}
                    </>
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
