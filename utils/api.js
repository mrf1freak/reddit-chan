import axios from "axios";

export async function getBoards(){
    const {data} = await axios.get('/api/boards')
    return data
}