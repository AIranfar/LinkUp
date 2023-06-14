const GET_ONE_USER = 'session/GET_ONE_USER'
const EDIT_USER = 'session/EDIT_USER'

export const actionGetOneUser = (user) => ({
	type: GET_ONE_USER,
	payload: user
})

export const actionEditUser = (user) => ({
	type: EDIT_USER,
	payload: user
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
		dispatch(actionEditUser(updatedUser))
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
		default:
			return state;
	}
}

export default userReducer;
