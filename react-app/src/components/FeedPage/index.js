import UserInfoBox from "../UserInfoBox";
import AllPosts from '../AllPosts';
import AboutLinkUp from "../AboutLinkUp";
import './Feed.css'

const Feed = () => {

    return (
        <div className="feed-page">
            <UserInfoBox />
            <AllPosts />
            <AboutLinkUp />
        </div>
    )
}

export default Feed;
