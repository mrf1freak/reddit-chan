import {useEffect, useState} from "react";
import Image from 'next/image'

import axios from "axios";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter()
    const {board, id} = router.query

    const [replies, setReplies] = useState({})
    const [posts, setPosts] = useState({})
    const OP_ID = id
    const BOARD = board

    function OPText(){
        if(typeof posts[OP_ID] === 'undefined') return ''
        return posts[OP_ID]['com']

    }

    function Reply(props){
        const {id, reply} = props
        const post = posts[id];
        const [hidden, setHidden] = useState(false)

        function imageWidth(){
            return post['tn_w']
        }

        function imageHeight(){
            return post['tn_h']
        }

        function containsImage(){
            return typeof post['tim'] !== 'undefined'
        }

        function imageThumbnailLink(){
            return `https://i.4cdn.org/${BOARD}/${post['tim']}s.jpg`
        }

        function ImageThumbnail(){
            if(containsImage()) return <div className="mr-4"><Image src={imageThumbnailLink()} width={imageWidth()} height={imageHeight()} alt="thumbnail"/></div>
            return null
        }

        function Replies(){
            if(typeof replies[id] === 'undefined') return null

            return (
                <div className="flex">
                    <div className="w-0.5 mt-2 bg-gray-300 cursor-pointer hover:bg-gray-500" onClick={() => setHidden(!hidden)}/>
                    {
                        hidden ?
                            <div className="ml-4 mt-4 italic">Replies have been hidden</div>
                            :
                            <div className="ml-4 mt-4"> {replies[id]?.map(post => <Reply key={post.reply} {...post}/>)}</div>
                    }
                </div>
            )
        }

        return (
            <div className="flex flex-row mb-8 ml-2 pl-3">
                <div>
                    <div className="inline-block p-1 text-sm text-gray-600 bg-green-50 rounded">Anonymous - No. {id}</div>
                    <div className="flex flex-row p-2 bg-gray-50 rounded">
                        {containsImage() && <ImageThumbnail /> }
                        <div dangerouslySetInnerHTML={{__html: reply}}/>
                    </div>
                    <Replies />
                </div>

            </div>
        )
    }

    useEffect(() => {
        if(typeof BOARD === 'undefined' || typeof OP_ID === 'undefined') return
        axios.get(`/api/${BOARD}/thread/${OP_ID}`).then(response => {
            const {replies, posts} = response.data
            setPosts(posts)
            setReplies(replies)
        })
    }, [BOARD, OP_ID])

    return (
        <div>
            { OPText() }
            {
                replies[OP_ID]?.map(post => <Reply key={post.reply} {...post}/>)
            }
        </div>
    )
}
