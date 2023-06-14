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
    const [profile_image, setprofile_image] = useState(singleUser.profile_image);
    const [about_me, setabout_me] = useState(singleUser.about_me)
    const [location, setLocation] = useState(singleUser.location)

    console.log('SINGLEUSER->', singleUser)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProfile = {
            first_name,
            last_name,
            profile_image,
            about_me,
            location
        }

        await dispatch(thunkEditProfile(updatedProfile, singleUser.id))
        closeModal();
        dispatch(thunkGetOneUser(singleUser.id))
    };

    return (
        <>
            <h1 className="edit-profile-header-text">Edit Your Profile</h1>
            <form className="edit-profile-form-container" onSubmit={handleSubmit}>
                {errors.map((error, idx) => (
                    <ul className='edit-profile-form-errors' key={idx}>{error}</ul>
                ))}
                <div className="edit-profile-container">
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
                        Profile Picture
                    </label>
                    <input
                        className="edit-profile-form-input"
                        type="text"
                        value={profile_image}
                        onChange={(e) => setprofile_image(e.target.value)}
                        required
                    />
                </div>
                <div className="edit-profile-container">
                    <label className="edit-profile-label-text">
                        About Me
                    </label>
                    <textarea
                        className="edit-profile-textarea-input"
                        rows={9}
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
