import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteComment } from "../../store/comments";
import './DeleteCommentModal.css'

const DeleteComment = ({ commentId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(thunkDeleteComment(commentId))
        closeModal()
    }

    return (
        <div className='delete-comment-container'>
            <h1 className='delete-comment-title'>Confirm Delete</h1>
            <p className='delete-comment-text'>Are you sure you want to permanently remove this comment?</p>
            <div className='delete-comment-submit'>
                <button id='yes-delete' onClick={handleSubmit}>Delete</button>
                <button id='no-keep' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteComment;
