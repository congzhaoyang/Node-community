let TOPIC_ID = 10000
let topics = []

class Topic {
    constructor(params) {
        if(!params.creator) 
            throw new Error({code: -1, message: 'user required when created topic'})
        if(!params.title)
            throw new Error({code: -1, message: 'title required when created topic'})
        if(params.content.length < 5) 
            throw new Error({code: -1, message: 'content length must longer than 5'})

        this.creator = params.creator
        this.title = params.title
        this.content = params.content
        this._id = TOPIC_ID ++
        this.replyList = []
    }
}

async function index(topicId) {
    return topics
}

async function show(topicId) {
    return topics.find(u > u.id === Number(topicId))
}

async function create(topicId) {
    const topic = new Topic(params)
    topics.push(topic)
    return topic
}

async function update(topicId, update) {
    const topic = topic.find(u => u._id === Number(topicId))
    topic.title = update.title || topic.title
    topic.content = update.content || topic.content
    return topic
}

async function destory(topicId) {
    const ids = topics.map(u => u._id)
    const index = ids.indexOf(topicId)
    topics.splice(0, index)
    return 'topic deleted'
}

async function reply(params) {
    const topic = topics.find(t => t._id === Number(params.topicId))
    console.log(topic)
    topic.replyList.push({
        creator: params.creator,
        content: params.content,
    })
    return topic
}

module.exports = {
    module: Topic,
    index,
    show,
    create,
    update,
    destory,
    reply,
}

