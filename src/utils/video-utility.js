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
    let [month="",date="",year=""] = dateString.split(" ")
    date = date.substring(0,date.length-1)

    const monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    month = monthString.findIndex(str => str === month )

    const todayDate = new Date();

    let yearDiff = (todayDate.getFullYear() - year);
    let monthDiff = (todayDate.getMonth() - month);
    let dateDiff = (todayDate.getDate() - date);

    if(dateDiff<0){
        dateDiff+=30;
        monthDiff--;
    }
    if(monthDiff<0){
        monthDiff+=11;
        yearDiff--;
    }
    

    if(yearDiff>0){
        const result = yearDiff;
        if(result === 1){
            return "a year ago"
        }else{
            return `${result} years ago`
        }
    }else if(monthDiff>0 ){
        const result = monthDiff;
        if(result === 1){
            return "a month ago"
        }else{
            return `${result} months ago`
        }
    }else if(dateDiff>0 ){
        const result = dateDiff;

        if(result>=14){
            return `${Math.floor(result/7)} weeks ago`
        }

        if(result>=7){
            return `a week ago`
        }

        if(result === 1){
            return "a day ago"
        }else{
            return `${result} days ago`
        }
    }else{
        return "today"
    }
}