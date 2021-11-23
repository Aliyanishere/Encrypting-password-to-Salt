const Reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userEmail: action.payload.userEmail };
        case "USER_LOGOUT": {
            return { ...state, userEmail: "" };
        }
        default:
            return state;
    }
}

export default Reducer;