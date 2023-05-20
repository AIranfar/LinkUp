const GET_ALL_COMMENTS = 'comments/GET_COMMENTS_BY_POST'

// ACTION

export const actionGetComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

// NORMALIZE FUNCTIONS

const normalizedAllComments = (comments) => {
    let normalizedComments = {}
    comments.forEach(comment => {
        normalizedComments[comment.id] = comment
    })
    return normalizedComments
}
// THUNKS

export const thunkGetComments = () => async dispatch => {
    const response = await fetch ('/api/comments/')

    if (response.ok) {
        const comments = await response.json()
        // console.log('NORMAL COMMENTS', comments)
        const normalizedComments = normalizedAllComments(comments)
        dispatch(actionGetComments(normalizedComments))
        return normalizedAllComments
    }
}

const initialState = { allComments : {} }

// REDUCER

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COMMENTS: {
            const newState = { ...state };
            newState.allComments = action.comments
            return newState
        }
        default: return state
    }
}

export default commentReducer;
