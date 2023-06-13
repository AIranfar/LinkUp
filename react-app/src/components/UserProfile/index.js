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

    //   console.log('allPOSTS->', userPosts)
    //   console.log('USERID', userId)

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
            <h1>USER PROFILE</h1>
            <AboutLinkUp />
        </div>
    );
};

export default UserProfile;
