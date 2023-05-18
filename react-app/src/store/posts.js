const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'

// ACTIONS

export const actionGetAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts
})

// NORMALIZE FUNCTIONS

const normalizedAllPosts = (posts) => {
    let normalizedPosts = {};
    posts.forEach(post => {
        normalizedPosts[post.id] = post;
    })
    return normalizedPosts
}

// THUNKS

export const thunkGetAllPosts = () => async dispatch => {
    const response = await fetch('/api/posts/');

    if (response.ok) {
        const posts = await response.json()
        const normalizedPosts = normalizedAllPosts(posts)
        // console.log('NORMAL POSTS', normalizedPosts)
        dispatch(actionGetAllPosts(normalizedPosts))
        return normalizedPosts
    }
}

const initialState = { allPosts: {}, userPosts: {}}

// Reducer

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_POSTS: {
            const newState = { ...state };
            newState.allPosts = action.posts
            return newState
        }
        default: return state
    }
}

export default postReducer;
