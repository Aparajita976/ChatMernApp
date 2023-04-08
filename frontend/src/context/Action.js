export const INITIAL_STATE = () => ({
    type: "INITIAL_STATE"
})
export const LOGIN_START = (usercredentials) => ({
    type: "LOGIN_START"
})
export const LOGIN_SUCCESS = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
})
export const LOGIN_FAILURE = () => ({
    type: "LOGIN_FAILURE"
})
export const LOGOUT = () => ({
    type: "LOGOUT"
})
export const DELETE = () => ({
    type: "DELETE_SUCCESS"
})