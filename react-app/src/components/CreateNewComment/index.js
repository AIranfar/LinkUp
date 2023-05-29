import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateNewComment } from '../../store/comments';
import { useModal } from "../../context/Modal";
import './CreateNewComment.css'

const CreateNewComment = ({ postId }) => {
    const dispatch = useDispatch();
    const [comment_body, setComment_body] = useState('')
    const [errors, setErrors] = useState('')
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    // console.log('POSTID', postId)

    const handleSubmit = async (e) => {
        e.preventDefault();

        let allErrors = {};

        if (comment_body.length > 500) allErrors.comment_body = "Comment must be less than 500 characters";
        if (comment_body.length < 1) allErrors.comment_body = "Comment field can not be empty";

        // console.log('FORM_DATA', comment_body)

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors);
        }

        const newComment = comment_body
        // console.log('NEWCOMMENT -->', newComment)
        dispatch(thunkCreateNewComment(postId, newComment))
        closeModal();
    };

    return (
        <div className='new-comment-container'>
            <div className="new-comment-header-container">
                <h3 className="new-comment-header">Add a new comment</h3>
            </div>
            <form className='new-comment-form-container' method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="new-comment-profile-info">
                    <img className='new-comment-profile-image' src={sessionUser.profile_image} />
                    <div className="new-comment-names">{sessionUser.first_name} {sessionUser.last_name}</div>
                </div>
                <div className="new-comment-body-container">
                    {errors.comment_body ? <p className='new-comment-errors'>{errors.comment_body}</p> : null}
                    <textarea
                        className="new-comment-body"
                        type='text'
                        rows='9'
                        onChange={(e) => setComment_body(e.target.value)}
                        value={comment_body}
                        placeholder='Add a comment...'
                        name='comment_body'
                    />
                </div>
                <div className='new-submit-button-container'>
                    <button className='new-comment-submit-button' type='submit'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewComment;
