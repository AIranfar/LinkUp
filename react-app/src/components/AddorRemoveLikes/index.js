import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddLike, thunkRemoveLike } from "../../store/likes";
import "./AddorRemoveLikes.css";

const AddorRemoveLikes = ({ post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allLikes = useSelector((state) => Object.values(state.allLikes.allLikes));

  const postLikes = allLikes.filter((like) => like.post_id === post.id);
  const postLiked = postLikes.some((like) => like.user_id === sessionUser.id);

  const handleClick = () => {
    if (postLiked) {
      dispatch(thunkRemoveLike(post.id));
    } else {
      dispatch(thunkAddLike(post.id));
    }
  };

  return (
    <button className='post-like-button' onClick={handleClick}>
      <i className={postLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"} />
      <div className="post-like-text">like</div>
    </button>
  );
};

export default AddorRemoveLikes;
