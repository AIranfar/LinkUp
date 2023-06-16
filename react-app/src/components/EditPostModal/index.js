import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { thunkEditPost, thunkGetAllPosts } from "../../store/posts";
import { useModal } from "../../context/Modal";
import './EditPostModal.css'

const EditPost = ({ postId }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const postsArr = Object.values(useSelector((state) => state.allPosts.allPosts))
    // console.log('EDITPOST', postsArr)
    const singlePost = postsArr.find((post) => post.id === postId)
    // console.log('singlePost-->', singlePost)
    // console.log('PostId', postId)
    // const [post_body, setPost_body] = useState(singlePost.post_body)
    // const [image, setImage] = useState(singlePost.image)
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let post_body = e.target.post_body.value
        let image = e.target.image.value

        let allErrors = {}

        if (post_body.length < 5 || post_body.length > 500) allErrors.post_body = 'Post must be between 5 and 500 characters'
        // if (image) {
        //     if (!image.endsWith('.png') && !image.endsWith('.jpg') && !image.endsWith('.jpeg')) allErrors.image = 'Image URL must end in .png, .jpg, or .jpeg'
        // }

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newPost = {
            post_body,
            image
        }

        await dispatch(thunkEditPost(newPost, singlePost.id))
        // console.log('updatedPOST --> ', updatedPost)
        closeModal();
        dispatch(thunkGetAllPosts())
    }

    return (
        <div className='edit-post-container'>
            <div className="edit-post-header-container">
                <h3 className="edit-post-header">Edit Your Post</h3>
            </div>
            <form className='edit-post-form-container' onSubmit={handleSubmit}>
                <div className="edit-post-profile-info">
                    <img className='edit-post-profile-image' src={sessionUser.profile_image} />
                    <div className="edit-post-names">{sessionUser.first_name} {sessionUser.last_name}</div>
                </div>
                <div className="edit-post-body-container">
                    {errors.post_body ? <p className='edit-post-errors' id='post-errors'>{errors.post_body}</p> : null}
                    <textarea
                        className="edit-post-body"
                        type='text'
                        rows='9'
                        defaultValue={singlePost.post_body}
                        placeholder='What do you want to talk about?'
                        name='post_body'
                    />
                </div>
                <div className="edit-post-image-container">
                {errors.image ? <p className='edit-post-errors' id='image-errors'>{errors.image}</p> : null}
                <input
                    className="edit-post-image"
                    type='url'
                    defaultValue={singlePost.image}
                    placeholder='Image (Optional)'
                    name='image'
                    />
                    </div>
                <div className='edit-submit-button-container'>
                    <button className='edit-post-submit-button' type='submit'>Edit Post</button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;
