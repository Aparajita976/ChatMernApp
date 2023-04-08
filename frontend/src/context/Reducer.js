const Reducer = (state, action) => {
    switch (action.type) {
        case "NITIAL_STATE":
            return {
                user: null,
                isFetching: false,
                error: false
            };
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            };

        case "DELETE_SUCCESS":
            return {
                user: null,
                isFetching: false,
                error: false
            };
        default:
            return state;
    }

}
export default Reducer;