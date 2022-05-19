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

export const getDateDifferenceString = (dateString) => {
    let [month,date,year] = dateString.split(" ")
    date = date.substring(0,date.length-1)

    const monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    month = monthString.findIndex(str => str === month )

    const todayDate = new Date();

    if((todayDate.getFullYear() - year)>0){
        const result = todayDate.getFullYear() - year;
        if(result === 1){
            return "a year ago"
        }else{
            return `${result} years ago`
        }
    }else if((todayDate.getMonth() - month)>0){
        const result = todayDate.getMonth() - month;
        if(result === 1){
            return "a month ago"
        }else{
            return `${result} months ago`
        }
    }else if((todayDate.getDate() - date)>0){
        const result = todayDate.getDate() - date;
        if(result === 1){
            return "a day ago"
        }else{
            return `${result} days ago`
        }
    }else{
        return "today"
    }
}