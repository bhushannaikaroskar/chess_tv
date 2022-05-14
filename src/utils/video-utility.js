export const getViewString = (views) => {
    let viewCount = "";
    let viewSymbol = "";
    if (views > 1000000) {
        viewSymbol = "M";
        views = views / 1000000;
        if (views > 10) {
            views = "" + views;
            viewCount = views.substring(0, 2);
        } else {
            views = "" + views;
            viewCount = views.substring(0, 3);
        }
    } else if (views > 1000) {
        viewSymbol = "K";
        views = views / 1000;
        if (views > 10 && views < 100) {
            views = "" + views;
            viewCount = views.substring(0, 2);
        } else {
            views = "" + views;
            viewCount = views.substring(0, 3);
        }
    } else {
        viewCount = "" + views;
    }

    return viewCount + viewSymbol;
};

export const getSubscribersString = (views) => {
    let viewCount = "";
    let viewSymbol = "";
    if (views > 1000000) {
        viewSymbol = "M";
        views = views / 1000000;
        if (views > 10) {
            views = "" + views;
            viewCount = views.substring(0, 2);
        } else {
            views = "" + views;
            viewCount = views.substring(0, 3);
        }
    } else if (views > 1000) {
        viewSymbol = "K";
        views = views / 1000;
        if (views > 10 && views < 100) {
            views = "" + views;
            viewCount = views.substring(0, 4);
        } else {
            views = "" + views;
            viewCount = views.substring(0, 3);
        }
    } else {
        viewCount = "" + views;
    }

    return viewCount + viewSymbol;
};