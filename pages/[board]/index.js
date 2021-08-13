import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from 'next/link'

import axios from "axios";
import {motion, AnimatePresence} from "framer-motion";

import Page from 'components/Page'
import PostStats from "components/post/PostStats";
import Head from "next/head";
import {postThumbnailLink, postTimeFromNow} from "utils/post";


export default function Catalog(){
    const router = useRouter()
    const {board} = router.query

    const [threads, setThreads] = useState([])

    function Thread(props){
        const {no, com, now, tim} = props.thread

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
            <Link href={`/${board}/thread/${no}`}>
            <a className="block flex px-4 py-2 bg-white border-t border-gray-200 shadow transition-shadow group hover:shadow-lg">
                <div className="h-full w-20 mr-6">
                    <img src={postThumbnailLink(board, tim)} alt=""/>
                </div>

                <div className="flex flex-col justify-between w-full">
                    <div className="text-gray-700 font-semibold group-hover:underline" dangerouslySetInnerHTML={{__html: com}} />
                    <div className="flex flex-row justify-between items-end">
                        <div className="mt-4"><PostStats post={props.thread} /></div>
                        <span className="text-sm text-gray-400" title={now}>
                            {postTimeFromNow(now)}
                        </span>
                    </div>
                </div>

            </a>
            </Link>
            </motion.div>

        )
    }

    useEffect(() => {
        if(typeof board === 'undefined') return

        axios.get(`/api/${board}/`).then(result => {
            const {data} = result
            setThreads(data)
        })
    }, [board])

    return (
        <Page>
            <Head>
                <title>/{board}/ - Catalog</title>
            </Head>
            <h1 className="p-8">/{board}/</h1>
            <AnimatePresence>
            <div className="m-8 bg-white rounded shadow">
                {
                    threads.map(thread => <Thread key={thread['md5']} thread={thread} />)
                }
            </div>
            </AnimatePresence>

        </Page>
    )
}