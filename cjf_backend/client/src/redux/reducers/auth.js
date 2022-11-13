const initialState = {
    token: '',
    userDetails: '',
    error: false,
    isLoggedIn: false,
}

export const auth = (state = initialState, action) => {

    switch (action.type) {
        case 'USER_LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                error: false,
                userDetails: action.payload,
            })
        case 'USER_LOGOUT':
            return initialState
        default:
            return state;
    }
}

export const isLoggedIn = state => state.auth.isLoggedIn
export const getUserDetails = state => state.auth.userDetails
export const getIsError = (state) => state.auth.error;
