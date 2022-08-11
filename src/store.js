import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import historyReducer from "./feature/history/historySlice";
import likeReducer from "./feature/like/likeSlice";
import playlistReducer from "./feature/playlist/playlistSlice";
import themeReducer from "./feature/theme/themeSlice";
import videoReducer from "./feature/video/videoSlice";
import watchlaterReducer from "./feature/watchlater/watchlaterSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        like: likeReducer,
        theme: themeReducer,
        history: historyReducer,
        playlist: playlistReducer,
        watchlater: watchlaterReducer,
        video: videoReducer
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // }),
});
