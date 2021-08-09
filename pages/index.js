import Page from 'components/Page'
import {getBoards} from "utils/api";
import {useEffect, useState} from "react";

export default function Home() {
    const [boards, setBoards] = useState([])

    function Board(props){
        const {board, title, meta_description} = props.board

        return (
            <div className="p-4 bg-white border border-gray-200 border-solid rounded transition-all duration-700 hover:bg-gray-100 hover:shadow">
                <a href={`/${board}`} onFocus={() => setFocus(true)}>
                    <div className="font-semibold">{board} - {title}</div>
                    <div dangerouslySetInnerHTML={{__html: meta_description}} className="font-light text-sm text-gray-600 mt-2" />
                </a>
            </div>
        )
    }

    function Boards(){
        return (
            <div className="p-4 grid grid-cols-4 gap-4">
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
            <h1 className="p-8 text-6xl font-semibold text-center">Boards</h1>
            <Boards />
        </Page>
    )
}
