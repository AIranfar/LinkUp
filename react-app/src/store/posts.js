const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const CREATE_NEW_POST = 'posts/CREATE_NEW_POST'

// ACTIONS

export const actionGetAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts
})

export const actionCreateNewPost = (post) => ({
    type: CREATE_NEW_POST,
    post
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

export const thunkCreateNewPost = (post) => async dispatch => {
    const response = await fetch('/api/posts/new', {
        method: 'POST',
        body: post
    })

    if (response.ok) {
        const newPost = await response.json()
        dispatch(actionCreateNewPost(newPost))
        return newPost
    }
}

const initialState = { allPosts: {}, singlePost: {} }

// Reducer

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const newState = { ...state };
            newState.allPosts = action.posts
            return newState
        }
        case CREATE_NEW_POST: {
            const newState = { ...state, allPosts: { ...state.allPosts } }
            newState.allPosts[action.post.id] = action.post
            return newState
        }
        default: return state
    }
}

export default postReducer;
