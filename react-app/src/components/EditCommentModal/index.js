import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { thunkEditComment, thunkGetComments } from "../../store/comments";
import { useModal } from "../../context/Modal";
import './EditCommentModal.css';

const EditComment = ({ commentId }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const commentsArr = Object.values(useSelector((state) => state.allComments.allComments))
    // console.log('COMMENTS ARRAY -> ', commentsArr)
    const singleComment = commentsArr.find((comment) => comment.id === commentId)
    // console.log('SINGLECOMMENT->', singleComment)
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault();

        let comment_body = e.target.comment_body.value

        let allErrors = {}

        if (comment_body.length > 500) allErrors.comment_body = 'Comment must be less than 500 characters'

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const updatedComment = {
            comment_body
        }

        dispatch(thunkEditComment(updatedComment, commentId))
        closeModal()
    }

    return (
        <div className='edit-comment-container'>
            <div>Edit Your Comment</div>
            <form className='edit-comment-form-container' onSubmit={handleSubmit}>
                <img className='edit-comment-profile-image' src={sessionUser.profile_image} />
                {errors.comment_body ? <p className='edit-comment-errors'>{errors.comment}</p> : null}
                <input
                    type='textbox'
                    rows='7'
                    defaultValue={singleComment.comment_body}
                    placeholder='What do you want to talk about?'
                    name='comment_body'
                />
                <div className='edit-submit-button-container'>
                    <button className='edit-comment-submit-button' type='submit'>Edit Comment</button>
                </div>
            </form>
        </div>
    )
}

export default EditComment;
