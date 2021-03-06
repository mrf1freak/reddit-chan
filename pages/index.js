import Page from 'components/Page'
import {getBoards} from "utils/api";
import {useEffect, useState} from "react";
import Link from 'next/link'
import Head from 'next/head'


export default function Home() {
    const [boards, setBoards] = useState([])

    function Board(props){
        const {board, title, meta_description} = props.board

        return (
            <div className="p-4 bg-white border border-gray-200 border-solid rounded transition-all duration-700 hover:shadow">
                <Link href={`/${board}`}>
                    <a>
                        <div className="font-semibold">{board} - {title}</div>
                        <div dangerouslySetInnerHTML={{__html: meta_description}} className="font-light text-sm text-gray-600 mt-2" />
                    </a>
                </Link>
            </div>
        )
    }

    function Boards(){
        return (
            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                { boards.map(item => <Board board={item} key={item['board']}/>)}
            </div>
        )
    }


    useEffect(() => {
        getBoards().then(boards => {
            setBoards(boards)
        })
    }, [])


    return (
        <Page>
            <Head>
                <title>
                    RedditChan
                </title>
            </Head>
            <h1 className="p-8">Boards</h1>
            <Boards />
        </Page>
    )
}
