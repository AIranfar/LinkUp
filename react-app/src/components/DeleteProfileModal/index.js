import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteProfile} from "../../store/user";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import './DeleteProfileModal.css'

const DeleteProfile = ({ userId }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();

    const handleSubmit = () => {
        closeModal()
        dispatch(thunkDeleteProfile(userId))
        dispatch(logout())
        history.push('/')
    }

    return (
        <div className='delete-profile-container'>
            <h1 className='delete-profile-title'>Confirm Delete</h1>
            <p className='delete-profile-text'>Are you sure you want to permanently delete your profile?</p>
            <div className='delete-profile-submit'>
                <button id='yes-delete' onClick={handleSubmit}>Delete</button>
                <button id='no-keep' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteProfile;
