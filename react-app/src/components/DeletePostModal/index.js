import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePost } from "../../store/posts";
import './DeletePostModal.css'

const DeletePost = ({ postId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = () => {
        dispatch(thunkDeletePost(postId))
        closeModal()
    }

    return (
        <div className='delete-review-container'>
            <h1 className='delete-review-title'>Confirm Delete</h1>
            <p className='delete-review-text'>Are you sure you want to remove this Post?</p>
            <div className='delete-review-submit'>
                <button id='yes-delete' onClick={handleSubmit}>Delete</button>
                <button id='no-keep' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReview;
