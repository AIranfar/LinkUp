const GET_LIKES = 'likes/GET_LIKES'
const ADD_LIKE = 'likes/ADD_LIKE'

export const actionGetLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

export const actionAddLike = (like) => ({
    type: ADD_LIKE,
    like
})

const normalAllLikes = (likes) => {
    let normalizedLikes = {}
    likes.forEach(like => {
        normalizedLikes[like.id] = like
    })
    return normalizedLikes
}

export const thunkGetLikes = () => async dispatch => {
    const response = await fetch(`/api/likes/`)

    if (response.ok) {
        const likes = await response.json()
        const normalizedLikes = normalAllLikes(likes)
        // console.log('NORMAL LIKES --> ', normalizedLikes)
        dispatch(actionGetLikes(normalizedLikes))
    }
}

export const thunkAddLike = (postId) => async dispatch => {
    const response  = await fetch(`/api/likes/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const like = await response.json();
        dispatch(actionAddLike(like))
    }
}

const initialState = { allLikes: {} }

const likesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_LIKES: {
            const newState = { ...state }
            newState.allLikes = action.likes
            return newState
        }
        case ADD_LIKE: {
            const newState = { ...state }
            newState.allLikes[action.like.id] = action.like
        }
        default: return state
    }
}

export default likesReducer;
