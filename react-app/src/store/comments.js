const GET_ALL_COMMENTS = 'comments/GET_COMMENTS_BY_POST'
const CREATE_NEW_COMMENT = 'comments/ADD_NEW_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

// ACTION

export const actionGetComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

export const actionCreateNewComment = (comment) => ({
    type: CREATE_NEW_COMMENT,
    comment
})

export const actionEditComment = (commentId) => ({
    type: EDIT_COMMENT,
    commentId
})

export const actionDeleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
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
    const response = await fetch('/api/comments/')

    if (response.ok) {
        const comments = await response.json()
        // console.log('NORMAL COMMENTS', comments)
        const normalizedComments = normalizedAllComments(comments)
        dispatch(actionGetComments(normalizedComments))
    }
}

export const thunkCreateNewComment = (postId, comment) => async dispatch => {
    const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
      });

    if (response.ok) {
        const newComment = await response.json()
        // console.log('NEW COMMENT:', newComment)
        dispatch(actionCreateNewComment(newComment))
    }
}

export const thunkEditComment = (comment, commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const updatedComment = await response.json()
        console.log('thunk comment', updatedComment)
        dispatch(actionEditComment(updatedComment))
    }
}

export const thunkDeleteComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeleteComment(commentId))
    }
}

const initialState = { allComments: {} }

// REDUCER

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS: {
            const newState = { ...state };
            newState.allComments = action.comments
            return newState
        }
        case CREATE_NEW_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } };
            newState.allComments[action.comment.id] = action.comment;
            return newState;
          }
          case EDIT_COMMENT: {
            const newState = { ...state };
            newState.allComments[action.commentId] = action.comment;
            return newState;
          }
        case DELETE_COMMENT: {
            const deleteState = { ...state }
            delete deleteState.allComments[action.commentId];
            return deleteState
        }
        default: return state
    }
}

export default commentReducer;
