const GET_ALL_COMMENTS = 'comments/GET_COMMENTS_BY_POST'
const CREATE_NEW_COMMENT = 'comments/ADD_NEW_COMMENT'

// ACTION

export const actionGetComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

export const actionCreateNewComment = (comment) => ({
    type: CREATE_NEW_COMMENT,
    comment
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
    }
}

export const thunkCreateNewComment = (post_id, comment) => async dispatch => {
    const response = await fetch(`/api/comments/${post_id}`, {
        method: 'POST',
        body: comment
    })
    if (response.ok) {
        const newComment = await response.json()
        // console.log('NEW COMMENT:', newComment)
        dispatch(actionCreateNewComment(newComment))
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
        case CREATE_NEW_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } }
            newState.allComments[action.comment.id] = action.post
            return newState
        }
        default: return state
    }
}

export default commentReducer;
