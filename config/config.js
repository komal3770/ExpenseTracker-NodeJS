const config = {
    app : {
        port : 8080
    },
    db : {
        host : 'cluster0-shard-00-00-vjsth.mongodb.net:27017,cluster0-shard-00-01-vjsth.mongodb.net:27017,cluster0-shard-00-02-vjsth.mongodb.net:27017',
        //port : 27017,
        name : 'expense_tracker_db',
        user : 'komalp',
        pass : 'komalp',
        authSource : 'admin'
    }
}

module.exports = config;