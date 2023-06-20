const GET_LIKES = 'likes/GET_LIKES'
const ADD_LIKE = 'likes/ADD_LIKE'
const REMOVE_LIKE = 'likes/REMOVE_LIKE'

export const actionGetLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

export const actionAddLike = (like) => ({
    type: ADD_LIKE,
    like
})

export const actionRemoveLike = (like) => ({
    type: REMOVE_LIKE,
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
        // console.log('LIKES--->',likes )
        const normalizedLikes = normalAllLikes(likes)
        // console.log('NORMAL LIKES --> ', normalizedLikes)
        dispatch(actionGetLikes(normalizedLikes))
    }
}

export const thunkAddLike = (postId) => async dispatch => {
    // console.log('POSTID', postId)
    const response  = await fetch(`/api/likes/${postId}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const like = await response.json();
        // console.log('LIKE-->', like)
        dispatch(actionAddLike(like))
        // dispatch(actionGetLikes())
    }
}

export const thunkRemoveLike = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/${postId}/remove` , {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const like = await response.json();
        dispatch(actionRemoveLike(like))
        dispatch(thunkGetLikes())
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
            const newState = { ...state, allLikes: { ...state.allLikes } }
            newState.allLikes[action.like.id] = action.like
            return newState
        }
        case REMOVE_LIKE: {
            const newState = { ...state }
            delete newState.allLikes[action.like]
            return newState
        }
        default: return state
    }
}

export default likesReducer;
