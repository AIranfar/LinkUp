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
            <form className='new-comment-form-container' method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                <img className='new-comment-profile-image' src={sessionUser.profile_image} />
                {errors.comment_body ? <p className='new-comment-errors'>{errors.comment_body}</p> : null}
                <input
                    type='textbox'
                    rows='3'
                    onChange={(e) => setComment_body(e.target.value)}
                    value={comment_body}
                    placeholder='Add a comment...'
                    name='comment_body'
                />
                <div className='new-comment-submit-button-container'>
                    <button className='new-comment-submit-button' type='submit'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewComment;
