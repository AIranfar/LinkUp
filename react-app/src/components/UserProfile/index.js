import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneUser } from "../../store/user";
import { thunkGetAllPosts } from "../../store/posts";
import AboutLinkUp from "../AboutLinkUp";
import UserInfoBox from "../UserInfoBox";
import OpenModalButton from "../OpenModalButton";
import EditProfileModal from "../EditProfileModal";
import DeleteProfileModal from "../DeleteProfileModal";
import EditPostModal from "../EditPostModal";
import DeletePostModal from "../DeletePostModal";
import "./UserProfile.css";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const allPostsArr = Object.values(useSelector((state) => state.allPosts.allPosts));
    const userPosts = allPostsArr.filter((post) => post.user_id == userId);
    const singleUser = useSelector((state) => state.singleUser.singleUser);

    console.log('USERPOSTS->', userPosts)
    console.log('singleUser', singleUser)

    useEffect(() => {
        dispatch(thunkGetOneUser(userId));
        dispatch(thunkGetAllPosts());
    }, [dispatch, userId]);

    if (!userId) {
        return <div className="loading">Loading...</div>;
    }

    const formatDate = (date) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const renderProfileAction = (singleUser) => {
        if (sessionUser.id === singleUser.id) {
            return (
                <div className="profile-edit-delete-container">
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                        modalComponent={<EditProfileModal userId={userId} />}
                        className="profile-edit-pencil-symbol"
                    />
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-trash-can"></i>}
                        modalComponent={<DeleteProfileModal userId={userId} />}
                        className="profile-delete-trashcan-symbol"
                    />
                </div>
            );
        }
        return null;
    };

    const renderPostActions = (post) => {
        if (sessionUser.id === post.user_id) {
            return (
                <div className="profile-post-edit-delete-container">
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                        modalComponent={<EditPostModal postId={post.id} />}
                        className="edit-pencil-symbol"
                    />
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-trash-can"></i>}
                        modalComponent={<DeletePostModal postId={post.id} />}
                        className="delete-trashcan-symbol"
                    />
                </div>
            );
        }
        return null;
    };

    const aboutMeInfo = () => {
        if (!singleUser.about_me) {
            return <div>Nothing Added</div>
        }
        else return singleUser.about_me
    }

    return (
        <div className="user-profile-page-container">
            <UserInfoBox />
            <div className="profile-page-wrapper-container">
                <div className="profile-page-user-info">
                    <div className="profile-page-image-container">
                        <img src={singleUser.profile_image} alt='user-profile-pic' className='user-profile-profile-image' />
                        <div className="profile-username-email-container">
                            <div className="profile-username">{singleUser.username}</div>
                            <div className="profile-email">{singleUser.email}</div>
                        </div>
                    </div>
                    <div className="profile-name-location-actions">
                        <div className="profile-name-location">
                            <div className="profile-page-name">{singleUser.first_name} {singleUser.last_name}</div>
                            <div className="profile-page-location">{singleUser.location}</div>
                        </div>
                        {renderProfileAction(singleUser)}
                    </div>
                </div>
                <div className="profile-page-about-me-container">
                    <h2 className="profile-page-about-header">About</h2>
                    <div className="profile-page-about-me">{aboutMeInfo()}</div>
                </div>
                <div className="profile-posts-container">
                    <h2 className="profile-post-header">Posts</h2>
                    {userPosts.reverse().map((post) => (
                        <div className="profile-post-cards">
                            <div className="profile-post-date-edit-delete">
                                <div className="profile-post-date">
                                    {formatDate(post.created_at)}
                                </div>
                                {renderPostActions(post)}
                            </div>
                            <div className="profile-page-post-image">
                                <div className="profile-post-body">
                                    {post.post_body}
                                </div>
                                <img src={post.image} className="profile-post-image" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AboutLinkUp />
        </div>
    );
};

export default UserProfile;
