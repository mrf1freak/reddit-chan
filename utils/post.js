import moment from "moment";

export function postThumbnailLink(board, tim) {
    return `https://i.4cdn.org/${board}/${tim}s.jpg`;
}

export function postTimeFromNow(time){
    return moment.utc(time * 1000).fromNow()
}