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

    function removeRecentThread(no, board){
        if(typeof localStorage === 'undefined') return

        const threads = getRecentThreads()
        const threadString = JSON.stringify(threads.filter(item => item.no !== no))

        localStorage.setItem('threads', threadString)

    }

    function handleRemoveRecent(e, no, board){
        e.preventDefault()

        setRecentThreads(recentThreads.filter(item => item.no !== no))
        removeRecentThread(no, board)
    }


    function Thread(props){
        const {com, tim, no, board} = props.thread

        const isActive = router.asPath.includes(board) && router.asPath.includes(no)
        const activeStyle = ' opacity-100 bg-gray-100 border-l-4 border-red-500 border-solid'

        return (
            <Link href={`/${board}/thread/${no}`}>
                <a className={"flex items-center m-4 p-2 text-sm font-semibold rounded animate transition-opacity group hover:bg-gray-100" + (isActive ? activeStyle : '')}>
                    <div className="flex-shrink-0 mr-4 rounded">
                        <img src={postThumbnailLink(board, tim)} width="38" height="38" className="flex-shrink-0" alt="thread thumbnail" referrerPolicy="no-referrer"/>
                    </div>
                    <div className="whitespace-nowrap overflow-hidden mr-auto">
                        <div className="max-h-6 overflow-hidden" dangerouslySetInnerHTML={{__html: com}} />
                        <span className="text-xs text-gray-600">/{board}/</span>
                    </div>
                    <div className="flex items-center flex-shrink-0 px-2 ml-2 self-stretch md:hidden opacity-60 hover:opacity-100 hover:text-red-500 group-hover:flex" onClick={(e) => handleRemoveRecent(e, no, board)}><CgClose/></div>
                </a>
            </Link>
        )
    }

    function RecentThreads(){
        return(
            <div>
                {recentThreads.map(item => <Thread thread={item} key={item.tim}/>)}
            </div>
        )
    }

    useEffect(() => {
        setRecentThreads(getRecentThreads())
    }, [])

    return (
        <nav className="h-full bg-white shadow-lg">
            <Link href="/">
                <a className="flex items-center justify-center text-3xl p-4 py-12 font-light md:flex-1">
                    <div className="flex items-center mr-2">
                        <img src="/logo.png" width="32" height="32" alt="RedditChan"/>
                    </div>
                    RedditChan</a>
            </Link>

            <ul className="mt-18">
                {/*<li className={"pl-8 py-2 border-red-500 text-lg font-semibold text-gray-400" + (router.pathname === '/' ? ' border-l-4 text-black' : '')}>Boards</li>*/}
            </ul>

            <div>
                <h3 className="ml-4 text-sm text-gray-400 font-light">Recent Threads</h3>
                <RecentThreads/>
            </div>
        </nav>
    )
}