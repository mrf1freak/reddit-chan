import {useEffect, useState} from "react";
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from "next/router";
import {postThumbnailLink} from "utils/post";
import {CgClose} from "react-icons/cg";


export default function Nav(){
    const [recentThreads, setRecentThreads] = useState([])

    const router = useRouter()

    function getRecentThreads(){
        if(typeof localStorage === 'undefined') return []

        const threadString = localStorage.getItem('threads') || '[]'
        return JSON.parse(threadString)
    }

    function handleRemoveRecent(no, board){
        setRecentThreads(recentThreads.filter(item => item.no !== no && item.board !== board))
    }


    function Thread(props){
        const {com, tim, no, board} = props.thread

        const isActive = router.asPath.includes(board) && router.asPath.includes(no)
        const activeStyle = ' opacity-100 bg-gray-100'

        return (
            <Link href={`/${board}/thread/${no}`}>
                <a className={"flex items-center m-4 p-2 text-sm opacity-80 font-semibold rounded group hover:opacity-100" + (isActive ? activeStyle : '')}>
                    <div className="flex-shrink-0 mr-4 rounded">
                        <Image src={postThumbnailLink(board, tim)} width="38" height="38" className="flex-shrink-0" alt="thread thumbnail"/>
                    </div>
                    <div className="whitespace-nowrap overflow-hidden">
                        <div className="" dangerouslySetInnerHTML={{__html: com}} />
                        <span className="text-xs text-gray-600">/{board}/</span>
                    </div>
                    <div className="flex-shrink-0 hidden ml-auto opacity-60 hover:opacity-100 hover:text-red-500 group-hover:block" onClick={() => handleRemoveRecent()}><CgClose/></div>
                </a>
            </Link>
        )
    }

    function RecentThreads(){
        return(
            <div>
                {getRecentThreads().map(item => <Thread thread={item} key={item.board + item.no}/>)}
            </div>
        )
    }

    useEffect(() => {
        setRecentThreads(getRecentThreads())
    }, [router.asPath])

    return (
        <nav className="h-full bg-white shadow-lg">
            <Link href="/" className="p-8">
                <a className="flex text-xl font-semibold md:flex-1 pr-3">RedditChan</a>
            </Link>

            <ul className="mt-18">
                <li className={"pl-8 py-2 border-red-500 text-lg font-semibold text-gray-400" + (router.pathname === '/' ? ' border-l-4 text-black' : '')}>Boards</li>
            </ul>

            <div>
                <h3 className="ml-4 text-sm text-gray-400 font-bold">Recent Threads</h3>
                <RecentThreads/>
            </div>
        </nav>
    )
}