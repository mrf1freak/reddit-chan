import Image from 'next/image'
import filesize from "filesize";
import {postThumbnailLink} from "utils/post";



export default function PostThumbnailImage(props){
    const {tim, tn_w, tn_h, filename, ext, fsize} = props.post
    const {board, className} = props

    if(typeof tim === 'undefined') return null

    return (
        <div className={className}>
            <a href={`https://i.4cdn.org/${board}/${tim}${ext}`} target="_blank" rel="noreferrer" className="pointer-events-auto">
                <Image
                    src={postThumbnailLink(board, tim)}
                    width={tn_w}
                    height={tn_h}
                    alt={filename}
                />
            </a>
            <div className="text-xs text-gray-400    overflow-ellipsis">{filename}{ext}</div>
            <div className="text-xs text-gray-400">{ext.toUpperCase().substring(1)} - {filesize(fsize, {round: 0})}</div>
        </div>
        )


}