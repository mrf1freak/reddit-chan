import {useEffect, useState} from "react";
import * as cachios from 'cachios'


export default function Nav(){
    const [boards, setBoards] = useState([])
    const [search, setSearch] = useState('')
    const [focus, setFocus] = useState(false)

    function searchBoards(){
        if(search === '') return boards.slice(0, 4)

        return boards.filter(item => {
            const {board, title, meta_description} = item

            const string = board + " " + title + " " + meta_description
            console.log(string)
            return string.toLowerCase().includes(search.toLowerCase())
        }).slice(0, 4)

        // TODO: sort the results
    }

    function Board(props){
        const {board, title, meta_description} = props.board

        return (
            <div className="p-2 border-b border-gray-200 border-solid transition-colors duration-700 hover:bg-gray-100">
                <a href={`/${board}`} onFocus={() => setFocus(true)}>
                    <div className="font-semibold">{board} - {title}</div>
                    <div dangerouslySetInnerHTML={{__html: meta_description}} className="font-light text-sm text-gray-600 mt-2" />
                </a>
            </div>
        )
    }

    function Boards(){
        if (!focus) return null

        return (
            <div className="absolute w-full bg-white top-14 border-gray-200 border border-solid rounded shadow">
                { searchBoards().map(item => <Board board={item} key={item['board']}/>)}
            </div>
        )
    }


    useEffect(() => {
        cachios.get('/api/boards').then(result => {
            const {data} = result
            setBoards(data)
        })
    }, [])

    return (
        <nav className="flex items-center bg-white shadow p-4">
            <div className="flex flex-1 text-xl font-semibold">RedditChan</div>
            <div className="relative flex flex-1 justify-center items-stretch">
                <input type="text" name="" id="" className="flex flex-1 p-2 bg-gray-100 focus:bg-white" placeholder="Search Boards" title={search} onChange={e => setSearch(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 250)}/>
                <Boards />
            </div>
            <div className="flex flex-1">

            </div>
        </nav>
    )
}