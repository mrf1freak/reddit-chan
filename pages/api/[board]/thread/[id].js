import {getThread} from "utils/4chan-api";

export default async function handle(req, res){
    const { board, id } = req.query

    try {
        const response = await getThread(board, parseInt(id))
        res.json(response)


    } catch (e){
        if(typeof e.response !== 'undefined'){
            res.status(e.response.status).end()
        } else {
            res.status(500).end()
        }
    }
}