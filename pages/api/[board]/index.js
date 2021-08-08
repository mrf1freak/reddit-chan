import {getCatalog} from "utils/4chan-api";

export default async function handle(req, res){
    const { board } = req.query

    const data = await getCatalog(board)
    res.json(data)
}