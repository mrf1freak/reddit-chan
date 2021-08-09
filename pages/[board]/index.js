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
            <div>
                <a href={`/${board}/thread/${no}`}>
                    <div className="m-4 p-4 bg-white rounded shadow">
                        <div className="flex">
                            <PostThumbnailImage post={props.thread} board={board} className="mr-4" />
                            <div className="flex flex-col w-full justify-between items-stretch">
                                <div className="flex justify-between">
                                    <div>
                                        <div dangerouslySetInnerHTML={{__html: com}} />
                                    </div>
                                    <span className="text-sm text-gray-400" title={now}>
                                        {moment(now).fromNow()}
                                    </span>
                                </div>
                                <div>
                                    <PostStats post={props.thread} />
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
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
            {
                threads.map(thread => <Thread key={thread['md5']} thread={thread} />)
            }
        </Page>
    )
}