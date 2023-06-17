import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { thunkEditProfile, thunkGetOneUser } from "../../store/user";
import { useModal } from "../../context/Modal";
import './EditProfileModal.css'


const EditProfile = ({ userId }) => {
    const dispatch = useDispatch();
    const singleUser = useSelector((state) => state.singleUser.singleUser);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const [first_name, setfirst_name] = useState(singleUser.first_name);
    const [last_name, setlast_name] = useState(singleUser.last_name);
    const [about_me, setabout_me] = useState(singleUser.about_me);
    const [location, setLocation] = useState(singleUser.location);

    // console.log('SINGLEUSER->', singleUser)

    const handleSubmit = async (e) => {
        e.preventDefault();

        let allErrors = {};

        if (first_name.length < 3 || first_name.length > 50) allErrors.first_name = '*First name must be between 4 and 40 characters';
        if (last_name.length < 3 || last_name.length > 50) allErrors.last_name = '*Last name must be between 4 and 40 characters';

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const updateProfile = {
            first_name,
            last_name,
            about_me,
            location
        }

        dispatch(thunkEditProfile(updateProfile, singleUser.id))
        // console.log('UPDATEDPROFILE->', updateProfile)
        closeModal();
        dispatch(thunkGetOneUser(singleUser.id));
    };

    return (
        <>
            <h1 className="edit-profile-header-text">Edit Your Profile</h1>
            <form className="edit-profile-form-container" onSubmit={handleSubmit}>
                <div className="edit-profile-container">
                    <div className='edit-profile-errors'>
                        {errors.first_name ? <p>{errors.first_name}</p> : null}
                    </div>
                    <label className="edit-profile-label-text">
                        First Name
                    </label>
                    <input
                        className="edit-profile-form-input"
                        type="text"
                        value={first_name}
                        onChange={(e) => setfirst_name(e.target.value)}
                        required
                    />
                </div>
                <div className="edit-profile-container">
                    <div className='edit-profile-errors'>
                        {errors.last_name ? <p>{errors.last_name}</p> : null}
                    </div>
                    <label className="edit-profile-label-text">
                        Last Name
                    </label>
                    <input
                        className="edit-profile-form-input"
                        type="text"
                        value={last_name}
                        onChange={(e) => setlast_name(e.target.value)}
                        required
                    />
                </div>
                <div className="edit-profile-container">
                    <label className="edit-profile-label-text">
                        About Me
                    </label>
                    <textarea
                        className="edit-profile-textarea-input"
                        rows={12}
                        value={about_me}
                        onChange={(e) => setabout_me(e.target.value)}
                        placeholder="Optional"
                    />
                </div>
                <div className="edit-profile-container">
                    <label className="edit-profile-label-text">
                        Location
                    </label>
                    <input
                        className="edit-profile-form-input"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Optional"
                    />
                </div>
                <div className="edit-profile-submit-container">
                    <button className="edit-profile-submit-button" type="submit">Update</button>
                </div>
            </form>
        </>
    );
}

export default EditProfile;
