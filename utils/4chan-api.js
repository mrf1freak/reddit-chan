import * as cachios from 'cachios'

import {postDictionary, threadReplies} from "utils/parser";


export async function getThread(board, id){
    const {data} = await cachios.get(`https://a.4cdn.org/${board}/thread/${id}.json`, {
        ttl: 300
    })

    const {posts} = data

    const replies = threadReplies(posts, id)
    const dictionary = postDictionary(posts)

    return {replies, posts: dictionary}
}

export async function getCatalog(board){
    const {data} = await cachios.get(`https://a.4cdn.org/${board}/catalog.json`, {
        ttl: 300
    })

    return data.reduce((accumulator, current) => accumulator.concat(current.threads), [])
}


