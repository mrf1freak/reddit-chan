function splitPost(string){
    let items = []
    let item = ''

    for (let i = 0; i < string.length; i++) {
        const c = string.charAt(i)

        switch (c)
        {
            case '<':
                items.push(item)
                item = '<'
                break

            case '>':
                items.push(item + '>')
                item = ''
                break

            default:
                item += c
        }
    }
    items.push(item)
    items = items.filter(item => item !== '')

    let newItems = []
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if(item.startsWith('<') && !item.includes('br')){
            const tag = items[i] + items[i + 1] + items[i + 2]
            newItems.push(tag)
            i += 2
        } else {
            newItems.push(item)
        }
    }

    return newItems
}

function replyIDFromATag(aTag){
    const start = aTag.search(/#p[0-9]/)
    const removedPrefix = aTag.substring(start)

    const end = removedPrefix.indexOf('"')

    return parseInt(removedPrefix.substring(2, end))
}

function isReplyLink(link){
    return link.startsWith('<a') && link.search(/#p[0-9]/) > -1
}

function addReplies(replies, replyIDs, reply, id) {
    if(reply === '') return false
    for (let i = 0; i < replyIDs.length; i++) {
        if(replyIDs[i] === id) continue

        if(!(replyIDs[i] in replies)) replies[replyIDs[i]] = []
        replies[replyIDs[i]].push({id, reply})
    }

    return true
}

export function postReplies(id, string, opID){
    let items = splitPost(string)

    let replies = {}
    let replyIDs = []
    let reply = ''

    if(items.length > 0 && !isReplyLink(items[0])) replyIDs.push(opID)
    for (const itemsKey in items) {
        const item = items[itemsKey]

        if(reply === '<br>') reply = ''
        if(isReplyLink(item)){
            if(addReplies(replies, replyIDs, reply, id)){
                replyIDs = []
                reply = ''
            }
            replyIDs.push(replyIDFromATag(item))
        } else {
            reply += item
        }
    }
    if(reply !== '' && replyIDs.length === 0) replyIDs.push(opID)
    addReplies(replies, replyIDs, reply, id)

    // Remove the starting break tag from posts
    Object.keys(replies).forEach(id => {
        replies[id].forEach((item, index) => {
            const {reply} = item
            if(reply.startsWith('<br>')) replies[id][index].reply = reply.replace('<br>', '', 1)
        })
    })

    return replies
}

export function threadReplies(posts, id){
    let replies = {}

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]
        const {no, com} = post

        if(typeof com === 'undefined') continue

        let currentPostReplies = postReplies(no, com, id)
        for (const id in currentPostReplies){
            if(id in replies){
                replies[id] = replies[id].concat(currentPostReplies[id])
            } else {
                replies[id] = currentPostReplies[id]
            }
        }

    }


    return replies
}

export function postDictionary(posts){
    const postsByID = {}
    for (let i = 0; i < posts.length; i++) {
        postsByID[posts[i]['no']] = posts[i]

    }

    return postsByID
}
