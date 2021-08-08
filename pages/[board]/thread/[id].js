import {useEffect, useState} from "react";
import Image from 'next/image'

import axios from "axios";
import {useRouter} from "next/router";
import PostThumbnailImage from "components/post/PostThumbnailImage";
import PostStats from "components/post/PostStats";

export default function Home() {
    const router = useRouter()
    const {board, id} = router.query

    const [replies, setReplies] = useState({})
    const [posts, setPosts] = useState({})
    const OP_ID = parseInt(id)
    const BOARD = board

    function OPText(){
        if(typeof posts[OP_ID] === 'undefined') return ''
        return posts[OP_ID]['com']

    }

    function Reply(props){
        const {id, reply} = props
        const post = posts[id];
        const [hidden, setHidden] = useState(false)

        function Replies(){
            if(typeof replies[id] === 'undefined') return null

            return (
                <div className="flex flex-col" id="replies">
                    {
                        hidden ?
                            <div className="ml-4 mt-4 italic">Replies have been hidden</div>
                            :
                            <div className="flex flex-col ml-6"> {replies[id]?.map(post => <Reply key={post.reply} {...post}/>)}</div>
                    }
                </div>
            )
        }

        return (
            <div className="mt-2">
                <div className="p-4 bg-white rounded shadow cursor-pointer transition-colors duration-500 hover:bg-gray-50" onClick={() => setHidden(!hidden)}>
                    <div className="inline-block py-1 mb-2 text-sm text-gray-600">{post['name']} - <span className="text-green-600">No. {id}</span></div>
                    <div className="flex flex-row">
                        <PostThumbnailImage post={post} board={board} className="mr-4" />
                        <div dangerouslySetInnerHTML={{__html: reply}}/>
                    </div>
                </div>
                <Replies />
            </div>
        )
    }

    function OPImage(){
        if(typeof posts[OP_ID] === 'undefined') return null

        const post = posts[OP_ID]
        return <Image src={`https://i.4cdn.org/${BOARD}/${post['tim']}s.jpg`} width={post['tn_w']} height={post['tn_h']} alt="OP thumbnail" />
    }

    function OP(){
        return <div className="mb-16 p-3 flex flex-col justify-center items-center bg-white rounded">
            <h2 className="text-xl">
                <div dangerouslySetInnerHTML={{__html: OPText()}} className="p-4 mb-16" />
            </h2>
            <OPImage />
            <PostStats post={posts[OP_ID]} />
        </div>
    }

    function Replies(){
        if(typeof replies[OP_ID] === 'undefined') return null

        return replies[OP_ID]?.map(post => <Reply key={post.reply} {...post}/>)

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

            <div className="flex flex-col items-center">
                <div className="lg:w-8/12 p-8">
                    <OP />
                    <Replies />
                </div>
            </div>


        </div>
    )
}
