import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneUser } from "../../store/session";
import { thunkGetAllPosts } from "../../store/posts";
import AboutLinkUp from "../AboutLinkUp";
import UserInfoBox from "../UserInfoBox";
import "./UserProfile.css";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const allPosts = useSelector((state) => state.allPosts.allPosts);

    console.log('ALLPOSTS->', allPosts)
    console.log('SessionUser=>', sessionUser)

    useEffect(() => {
        dispatch(thunkGetOneUser(userId));
        dispatch(thunkGetAllPosts());
    }, [dispatch])

    return (
        <div className="user-profile-page-container">
            <UserInfoBox />
            <h1>USER PROFILE</h1>
            <AboutLinkUp />
        </div>
    )
}

export default UserProfile;
