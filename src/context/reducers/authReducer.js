
export const initialAuthState = {
    isAuthenticated: false,
    authToken: "",
    user: {
        firstName: "",
        lastName: "",
        email: "",
    },
};

export const authReducer = (state, action) => {
    let email, firstName, lastName, _id;
    switch (action.type) {
        case "VERIFIED":
            ({ email, firstName, lastName, _id } =
                action.payload.foundUser);
            return {
                ...state,
                isAuthenticated: true,
                user: { email, firstName, lastName, _id },
                authToken: action.payload.token,
            };
        case "SIGNUP_VERIFIED":
            ({ email, firstName, lastName, _id } =
                action.payload.createdUser);
            return {
                ...state,
                isAuthenticated: true,
                user: { email, firstName, lastName, _id },
                authToken: action.payload.token,
            };
        case "RESET":
            return { ...initialAuthState };
        default:
            return state;
    }
};