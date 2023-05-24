import UserInfoBox from "../UserInfoBox";
import AllPosts from '../AllPosts';
import './Feed.css'

const Feed = () => {
    return (
        <div className="feed-page">
            <UserInfoBox />
            <AllPosts />
        </div>
    )
}

export default Feed;
