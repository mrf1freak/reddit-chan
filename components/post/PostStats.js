import {BiCommentDetail} from "react-icons/bi";
import {BsCardImage} from "react-icons/bs";

export default function PostStats(props){
    const {replies, images} = props.post
    return (
        <div className="flex text-sm text-gray-400">
            <div className="flex items-center justify-between mr-3">
                <BiCommentDetail/>
                <span className="ml-1">{replies}</span>
            </div>
            <div className="flex items-center justify-between">
                <BsCardImage/>
                <span className="ml-1">{images}</span>
            </div>
        </div>
    )
}