import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddLike, thunkRemoveLike } from "../../store/likes";
import "./AddorRemoveLikes.css";

const AddorRemoveLikes = ({ post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allLikes = Object.values(useSelector((state) => state.allLikes.allLikes));

  const postLikes = allLikes.filter((like) => like.post_id === post.id);
  const postLiked = postLikes.some((like) => like.user_id === sessionUser.id);

  const handleClick = async () => {
    if (postLiked) {
      await dispatch(thunkRemoveLike(post.id));
    } else {
      await dispatch(thunkAddLike(post.id));
    }
  };

  if (!allLikes) return null;

  return (
    <button className={`post-like-button ${postLiked ? "liked" : ""}`} onClick={handleClick}>
      <i className={postLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"} />
      <div className={`post-like-text ${postLiked ? "liked-text" : ""}`}>Like</div>
    </button>
  );
};

export default AddorRemoveLikes;
