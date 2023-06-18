const GET_LIKES = 'likes/GET_LIKES'

export const actionGetLikes = (likes) => ({
    type: GET_LIKES,
    payload: likes
})

export const thunkGetLikes = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/${postId}`)

    if (response.ok) {
        const likes = await response.json()
        dispatch(actionGetLikes(likes))
    }
}

const initialState = { allLikes: {} }

const likesReducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state
    }
}

export default likesReducer;
