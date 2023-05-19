const GET_COMMENTS_BY_POST = 'comments/GET_COMMENTS_BY_POST'

// ACTION

export const actionGetComments = (comments) => ({
    type: GET_COMMENTS_BY_POST,
    comments
})

// NORMALIZE FUNCTIONS

const normalizedAllComments = (comments) => {
    let normalizedComments = {}
    comments.forEach(comment => {
        normalizedComments[comment.id] = comment
    })
}
// THUNKS

export const thunkGetComments = (postId) => async dispatch => {
    const response = await fetch (`/api/comments/${postId}`)

    if (response.ok) {
        const comments = await response.json()
        const normalizedComments = normalizedAllComments(comments)
        dispatch(actionGetComments(normalizedComments))
        return normalizedAllComments
    }
}

const initialState = { allComments : {} }

// REDUCER

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COMMENTS_BY_POST: {
            const newState = { ...state };
            newState.allComments = action.comments
            return newState
        }
        default: return state
    }
}

export default commentReducer;
