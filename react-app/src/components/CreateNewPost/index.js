import React, { useState } from "react";
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
    // console.log('SessionUser', sessionUser)
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();


        let allErrors = {}

        if (post_body.length < 5 || post_body.length > 500) allErrors.post_body = 'Post must be between 5 and 500 characters'
        if (image) {
            if (!image.endsWith('.png') && !image.endsWith('.jpg') && !image.endsWith('.jpeg')) allErrors.image = 'Image URL must end in .png, .jpg, or .jpeg'
        }

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newPost = new FormData();
        newPost.append('post_body', post_body)
        newPost.append('image', image)
        console.log('NEWPOST', newPost.get('post_body'))

        dispatch(thunkCreateNewPost(newPost))
        closeModal();
    }

    return (
        <div className='new-post-container'>
            <div className="new-post-header-container">
                <h3 className="new-post-header">Create a New Post</h3>
            </div>
            <form className='new-post-form-container' method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="new-post-profile-info">
                    <img className='new-post-profile-image' src={sessionUser.profile_image} />
                    <div className="new-post-names">{sessionUser.first_name} {sessionUser.last_name}</div>
                </div>
                <div className="new-post-body-container">
                    {errors.post_body ? <p className='new-post-errors' id='post-errors'>{errors.post_body}</p> : null}
                    <textarea
                        className="new-post-body"
                        type='text'
                        rows='9'
                        onChange={(e) => setPost_body(e.target.value)}
                        value={post_body}
                        placeholder='What do you want to talk about?'
                        name='post_body'
                    />
                </div>
                <div className="new-post-body-container">
                    {errors.image ? <p className='new-post-errors' id='image-errors'>{errors.image}</p> : null}
                    <input
                        className="new-post-image"
                        type='url'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        placeholder='Image URL (Optional)'
                        name='image'
                    />
                </div>
                <div className='new-submit-button-container'>
                    <button className='new-post-submit-button' type='submit'>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewPost;
