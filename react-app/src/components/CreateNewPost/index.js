import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateNewPost } from "../../store/posts";
import { useModal } from "../../context/Modal";
import './CreateNewPost.css'

const CreateNewPost = () => {
    const dispatch = useDispatch();
    const [post_body, setPost_body] = useState('')
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState('');
    const sessionUser = useSelector((state) => state.session.user);
    console.log('SessionUser', sessionUser)
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();


        let allErrors = {}

        if (post_body.length < 5 || post_body.length > 500) allErrors.post_body = 'Post must be between 5 and 500 characters'
        // if (!image.endsWith('.png') && !image.endsWith('.jpg') && !image.endsWith('.jpeg')) allErrors.image = 'Image URL must end in .png, .jpg, or .jpeg'
        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newPost = new FormData();
        newPost.append('post_body', post_body)
        newPost.append('image', image)

        dispatch(thunkCreateNewPost(newPost))
        closeModal();
    }

    return (
        <div className='new-post-container'>
            <div>Create a New Post</div>
            <form className='new-post-form-container' method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                <img className='new-post-profile-image' src={sessionUser.profile_image} />
                {errors.post_body ? <p className='new-post-errors'>{errors.post_body}</p> : null}
                <input
                    type='textbox'
                    rows='7'
                    onChange={(e) => setPost_body(e.target.value)}
                    value={post_body}
                    placeholder='What do you want to talk about?'
                    name='post_body'
                />
                <input
                    type='url'
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    placeholder='Image'
                    name='image'
                />
                <div className='new-submit-button-container'>
                    <button className='new-post-submit-button' type='submit'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewPost;
