import {getBoards} from "utils/4chan-api";

export default async function handle(req, res){
    const response = await getBoards()
    res.json(response)
}