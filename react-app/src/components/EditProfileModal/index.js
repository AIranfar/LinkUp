import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { thunkEditPost, thunkGetAllPosts } from "../../store/posts";
import { useModal } from "../../context/Modal";
import './EditProfileModal.css'


const EditProfile = ({userId}) => {
    const dispatch = useDispatch();
    const singleUser = useSelector((state) => state.singleUser.singleUser);
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();

    return(
        <h1>USER PROFILE</h1>
    )
}

export default EditProfile;
