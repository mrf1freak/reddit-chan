import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";

import Page from 'components/Page'
import PostThumbnailImage from "components/post/PostThumbnailImage";
import PostStats from "components/post/PostStats";

export default function Catalog(){
    const router = useRouter()
    const {board} = router.query

    const [threads, setThreads] = useState([])

    function Thread(props){
        const {no, com, now} = props.thread

        return (
            <a href={`/${board}/thread/${no}`}  className="block flex m-4 p-4 bg-white rounded shadow transition-shadow hover:shadow-lg">
                <div className="flex flex-col w-full justify-between items-stretch">
                    <div className="flex">
                        <PostThumbnailImage post={props.thread} board={board} className="mr-4" />
                        <div className="text-gray-700 font-semibold" dangerouslySetInnerHTML={{__html: com}} />
                    </div>
                    <div className="flex justify-between mt-4">
                        <PostStats post={props.thread} />
                        <span className="text-sm text-gray-400" title={now}>
                            {moment(now).fromNow()}
                        </span>
                    </div>
                </div>
            </a>
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
            <h1 className="p-8 text-center">/{board}/</h1>
            <div className="grid grid-cols-4 gap-4">
                {
                    threads.map(thread => <Thread key={thread['md5']} thread={thread} />)
                }
            </div>

        </Page>
    )
}