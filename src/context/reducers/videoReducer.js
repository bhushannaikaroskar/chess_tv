
export const initialVideoState = {
    videos: [],
    filters: {
        learn: false,
        openings: false,
        tournament: false,
        advanced: false,
    },
};

export const videoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_VIDEOS":
            return { ...state, videos: [...action.payload.videos] };
        case "TOGGLE_FILTERS":
            return {...state,filters:{...state.filters, [action.payload.key]:!state.filters[action.payload.key]}}
        case "RESET_FILTERS":
            return { ...state,filters:{...initialVideoState.filters} };
        default:
            return state;
    }
}