import {useEffect, useState} from "react";

import axios from "axios";
import {useRouter} from "next/router";
import PostThumbnailImage from "components/post/PostThumbnailImage";
import PostStats from "components/post/PostStats";
import Page from "components/Page";
import Head from "next/head";
import Link from "next/link";
import {BsArrowLeft} from "react-icons/bs";
import InternalError from "components/InternalError";
import NotFound from "components/NotFound";
import {postTimeFromNow} from "utils/post";

export default function Home() {
    const router = useRouter()
    const {board, id} = router.query

    const [replies, setReplies] = useState({})
    const [posts, setPosts] = useState({})
    const [status, setStatus] = useState(0)
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
                <div>
                    {
                        hidden ?
                            null
                            :
                            <div className="ml-6"> {replies[id]?.map(post => <Reply key={post.reply} index={index + 1} {...post}/>)}</div>
                    }
                </div>
            )
        }

        function color(i){
            const colors = ['#ef476f', '#FFD166', '#06D6A0', '#118AB2', '#073B4C']

            if(i === 0) return '#00000000'
            return colors[(i - 1) % colors.length]
        }

        if(typeof post === 'undefined') return null

        return (
            <div className="border-t">
                <div className="p-4 border-l-4 border-solid cursor-pointer transition-colors duration-500 hover:bg-gray-50" style={{borderColor: color(index)}} onClick={() => setHidden(!hidden)}>
                    <div className="inline-block py-1 mb-2 text-sm text-gray-600">{post['name']} - <span className="text-green-600">No. {id}</span><span className="text-xs" title={post['now']}> - {postTimeFromNow(post['now'])}</span></div>
                    <div className="flex flex-row">
                        <PostThumbnailImage post={post} board={board} className="mr-4" />
                        <span className="whitespace-normal" dangerouslySetInnerHTML={{__html: reply}}/>
                    </div>
                    {hidden && <div className="ml-4 mt-4 italic">Replies have been hidden</div> }
                </div>
                <Replies />
            </div>
        )
    }

    function OP(){
        if(typeof posts[OP_ID] === 'undefined') return null

        return <div className="inline-block mb-16 p-3 bg-white border border-gray-300 rounded shadow">
            <h2 className="text-xl">
                <div dangerouslySetInnerHTML={{__html: OPText()}} className="mb-4" />
            </h2>
            <PostThumbnailImage post={posts[OP_ID]} board={board} />
            <div className="mt-4">
                <PostStats post={posts[OP_ID]} />
            </div>
        </div>
    }

    function Replies() {
        if (typeof replies[OP_ID] === 'undefined') return null

        return (
            <div className="bg-white shadow rounded">
                {replies[OP_ID]?.map(post => <Reply key={post.reply} index={0} {...post}/>)}
            </div>
        )

    }

    function Thread(){
        if(status === 0) return null
        if(status === 500) return <div><InternalError/></div>
        if(status === 404) return <div><NotFound/></div>

        return <div>
            <OP />
            <Replies />
        </div>
    }

    useEffect(() => {
        if(typeof BOARD === 'undefined' || typeof OP_ID === 'undefined') return
        axios.get(`/api/${BOARD}/thread/${OP_ID}`).then(response => {
            const {replies, posts} = response.data
            setPosts(posts)
            setReplies(replies)
            setStatus(200)
            addThreadToRecent(posts[OP_ID], BOARD)
        }).catch(e => {
            console.log(e)
            setStatus(e.response?.status)
        })
    }, [BOARD, OP_ID])

    function addThreadToRecent(thread, board){
        const threadString = window.localStorage.getItem("threads") || '[]'
        let threads = JSON.parse(threadString)

        const alreadyAdded = threads.some(item => item.no === thread.no && item.board === board)
        if(alreadyAdded) return

        const {com, no, tim} = thread
        threads.unshift({com, no, board, tim})

        window.localStorage.setItem('threads', JSON.stringify(threads))
    }

    return (
        <Page>
            <Head>
                <title>/{board}/ - {OPText()}</title>
            </Head>

            <div className="p-8">
                <h2 className="font-light text-4xl mb-8">
                    <Link href={`/${board}`}>
                        <a className="flex items-end"><BsArrowLeft/>/back to /{board}/</a>
                    </Link>
                </h2>
                <Thread/>
            </div>
        </Page>
    )
}
