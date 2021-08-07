import {getThread} from "utils/4chan-api";

export default async function handle(req, res){
    const { board, id } = req.query

    const response = await getThread(board, parseInt(id))
    res.json(response)
}