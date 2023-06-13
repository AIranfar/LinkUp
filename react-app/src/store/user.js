const GET_ONE_USER = 'session/GET_ONE_USER'

export const actionGetOneUser = (user) => ({
	type: GET_ONE_USER,
	payload: user
})

export const thunkGetOneUser = (userId) => async dispatch => {
	const response = await fetch(`/api/users/${userId}`);

	if (response.ok) {
		const user = await response.json()
		dispatch(actionGetOneUser(user))
	}
}

const initialState = { singleUser: {} };

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ONE_USER:
			return { singleUser: action.payload}
		default:
			return state;
	}
}

export default userReducer;
