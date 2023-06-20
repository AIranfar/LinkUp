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
    const [post_body, setPost_body] = useState(singlePost.post_body)
    const [image, setImage] = useState(singlePost.image)
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let allErrors = {}

        if (post_body.length < 5 || post_body.length > 500) allErrors.post_body = 'Post must be between 5 and 500 characters'

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newPost = new FormData();
        newPost.append('post_body', post_body)
        newPost.append('image', image)

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
            <form className='edit-post-form-container' method='PUT' encType="multipart/form-data" onSubmit={handleSubmit}>
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
                        value={post_body}
                        onChange={(e) => setPost_body(e.target.value)}
                        placeholder='What do you want to talk about?'
                        name='post_body'
                    />
                </div>
                <div className="edit-post-image-container">
                    <div className="edit-post-image-header-icon">
                        <h4 className="edit-post-image-text">Edit Image (optional)</h4>
                        <label htmlFor="image-upload" className="edit-post-image-label">
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <i className="fa-regular fa-image"></i>
                                <div className="edit-post-image-file-name">{image.name}</div>
                            </div>
                        </label>
                    </div>
                    <input
                        id="image-upload"
                        className="edit-post-image"
                        type='file'
                        // value={image}
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => setImage(e.target.files[0])}
                        placeholder='Image (Optional)'
                        name='image'
                    />
                    <div className='edit-submit-button-container'>
                        <button className='edit-post-submit-button' type='submit'>Edit Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPost;
