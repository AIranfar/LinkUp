const GET_ONE_USER = 'user/GET_ONE_USER'
const GET_ALL_USERS = 'user/GET_ALL_USERS'
const EDIT_USER = 'user/EDIT_USER'
const DELETE_USER = 'user/DELETE_USER'

export const actionGetOneUser = (user) => ({
	type: GET_ONE_USER,
	payload: user
})

export const actionGetAllUsers = (users) => ({
	type: GET_ALL_USERS,
	payload: users
})

export const actionEditUser = (user) => ({
	type: EDIT_USER,
	payload: user
})

export const actionDeleteUser = (userId) => ({
	type: DELETE_USER,
	payload: userId
})

const normalizedAllUsers = (users) => {
	// console.log('USERS-->', users)
	let normalizedUsers = {};
	users.forEach(user => {
		normalizedUsers[user.dispatch] = user
	})
	return normalizedUsers
}

export const thunkGetOneUser = (userId) => async dispatch => {
	const response = await fetch(`/api/users/${userId}`);

	if (response.ok) {
		const user = await response.json()
		dispatch(actionGetOneUser(user))
	}
}

export const thunkGetAllUsers = () => async dispatch => {
	const response = await fetch(`/api/users/`);

	if (response.ok) {
		const users = await response.json();
		// const normalUsers = normalizedAllUsers(users)
		dispatch(actionGetAllUsers(users))
	}
}

export const thunkEditProfile = (userInfo, userId) => async dispatch => {
	console.log('input data-->', userInfo)
	const response = await fetch(`/api/users/${userId}`, {
		method: 'PUT',
		body: userInfo
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

const initialState = { singleUser: {}, allUsers: {} };

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ONE_USER:
			return { singleUser: action.payload }
		case GET_ALL_USERS:
			return { allUsers: action.payload}
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
