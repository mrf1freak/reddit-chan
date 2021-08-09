import {useEffect, useState} from "react";

import axios from "axios";
import {useRouter} from "next/router";
import PostThumbnailImage from "components/post/PostThumbnailImage";
import PostStats from "components/post/PostStats";
import Page from "components/Page";

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
        const {id, reply, index} = props

        const [hidden, setHidden] = useState(false)

        const post = posts[id];

        function Replies(){
            if(typeof replies[id] === 'undefined') return null

            return (
                <div className="flex flex-col" id="replies">
                    {
                        hidden ?
                            <div className="ml-4 mt-4 italic">Replies have been hidden</div>
                            :
                            <div className="flex flex-col ml-6"> {replies[id]?.map(post => <Reply key={post.reply} index={index + 1} {...post}/>)}</div>
                    }
                </div>
            )
        }

        function color(i){
            const colors = ['#00000000', '#ef476f', '#FFD166', '#06D6A0', '#118AB2', '#073B4C']

            return colors[i % colors.length]
        }

        return (
            <div className="mt-2">
                <div className="p-4 bg-white border-l-4 border-solid rounded shadow cursor-pointer transition-colors duration-500 hover:bg-gray-50" style={{borderColor: color(index)}} onClick={() => setHidden(!hidden)}>
                    <div className="inline-block py-1 mb-2 text-sm text-gray-600">{post['name']} - <span className="text-green-600">No. {id}</span> ({index})</div>
                    <div className="flex flex-row">
                        <PostThumbnailImage post={post} board={board} className="mr-4" />
                        <div dangerouslySetInnerHTML={{__html: reply}}/>
                    </div>
                </div>
                <Replies />
            </div>
        )
    }

    function OP(){
        if(typeof posts[OP_ID] === 'undefined') return null

        return <div className="mb-16 p-3 flex flex-col justify-center items-center bg-white rounded">
            <h2 className="text-xl">
                <div dangerouslySetInnerHTML={{__html: OPText()}} className="p-4 mb-16" />
            </h2>
            <PostThumbnailImage post={posts[OP_ID]} board={board} className="mr-4" />
            <PostStats post={posts[OP_ID]} />
        </div>
    }

    function Replies(){
        if(typeof replies[OP_ID] === 'undefined') return null

        return replies[OP_ID]?.map(post => <Reply key={post.reply} index={0} {...post}/>)

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
        <Page>
            <div className="flex flex-col items-center">
                <div className="lg:w-8/12 p-8">
                    <OP />
                    <Replies />
                </div>
            </div>
        </Page>
    )
}
