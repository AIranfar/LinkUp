const GET_LIKES = 'likes/GET_LIKES'

export const actionGetLikes = (likes) => ({
    type: GET_LIKES,
    likes
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

const initialState = { allLikes: {} }

const likesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_LIKES: {
            const newState = { ...state }
            newState.allLikes = action.likes
            return newState
        }
        default: return state
    }
}

export default likesReducer;
