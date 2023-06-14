const GET_ONE_USER = 'user/GET_ONE_USER'
const EDIT_USER = 'user/EDIT_USER'
const DELETE_USER = 'user/DELETE_USER'

export const actionGetOneUser = (user) => ({
	type: GET_ONE_USER,
	payload: user
})

export const actionEditUser = (user) => ({
	type: EDIT_USER,
	payload: user
})

export const actionDeleteUser = (userId) => ({
	type: DELETE_USER,
	payload: userId
})

export const thunkGetOneUser = (userId) => async dispatch => {
	const response = await fetch(`/api/users/${userId}`);

	if (response.ok) {
		const user = await response.json()
		dispatch(actionGetOneUser(user))
	}
}


export const thunkEditProfile = (userInfo, userId) => async dispatch => {
	const response = await fetch(`/api/users/${userId}`, {
		method: 'PUT',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userInfo)
	})

	if (response.ok) {
		const updatedUser = await response.json();
		// console.log('updatedUSER--->', updatedUser)
		dispatch(actionEditUser(updatedUser))
	}
}

export const thunkDeleteProfile = (userId) => async dispatch => {
	const response = await fetch(`/api/users/${userId}`, {
		method: 'DELETE'
	})

	if (response.ok) {
		dispatch(actionDeleteUser(response))
	}
}

const initialState = { singleUser: {} };

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ONE_USER:
			return { singleUser: action.payload }
		case EDIT_USER: {
			const newState = { ...state }
			newState.singleUser = action.payload
			return newState
		}
		case DELETE_USER: {
			const newState = { ...state }
			delete newState.singleUser.userId
			return newState
		}
		default:
			return state;
	}
}

export default userReducer;
