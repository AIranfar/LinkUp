import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../store/posts";
import './AllPosts.css'

const GetAllPosts = () => {
    const dispatch = useDispatch();
    const allPosts = Object.values(useSelector((state) => state.allPosts.allPosts))
    console.log('POSTS', allPosts)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    return (
        <div>
            {allPosts.map((post) => {
                return (
                    <div>
                        {post.post_body}
                    </div>
                    )})}
        </div>
    )
}

export default GetAllPosts;
