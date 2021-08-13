import moment from "moment";

export function postThumbnailLink(board, tim) {
    return `https://i.4cdn.org/${board}/${tim}s.jpg`;
}

export function postTimeFromNow(now){
    return moment.utc(now).add(-new Date().getTimezoneOffset(), 'minutes').fromNow()
}