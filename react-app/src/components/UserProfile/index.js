import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneUser } from "../../store/user";
import { thunkGetAllPosts } from "../../store/posts";
import AboutLinkUp from "../AboutLinkUp";
import UserInfoBox from "../UserInfoBox";
import "./UserProfile.css";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const allPostsArr = Object.values(useSelector((state) => state.allPosts.allPosts));
    const userPosts = allPostsArr.filter((post) => post.user_id == userId);
    const singleUser = useSelector((state) => state.singleUser.singleUser)

    // console.log('allPOSTS->', userPosts)
    console.log('singleUser', singleUser)

    useEffect(() => {
        dispatch(thunkGetOneUser(userId));
        dispatch(thunkGetAllPosts());
    }, [dispatch, userId]);

    if (!userId) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="user-profile-page-container">
            <UserInfoBox />
            <div className="profile-page-wrapper-container">
                <div className="profile-page-user-info">
                    <div className="profile-page-image-container">
                        <img src={singleUser.profile_image} alt='user-profile-pic' className='user-profile-profile-image' />
                    </div>
                    <div className="profile-page-name">{singleUser.first_name} {singleUser.last_name}</div>
                    <div className="profile-page-location">{singleUser.location}</div>
                </div>
                <div className="profile-page-about-me-container">
                    <h2 className="profile-page-about">About</h2>
                    <div className="profile-page-about-me">{singleUser.about_me}</div>
                </div>
            </div>
            <AboutLinkUp />
        </div>
    );
};

export default UserProfile;
