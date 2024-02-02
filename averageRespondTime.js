//This program calcutes the average times of taken by server to respond to a client request.
//Learned about res.on("finish", callback)


let express = require('express')
let app = express()
let averageTime = 0
let requestCounter = 0
let lastStartTime = 0


function start(req, res, next) {
    d = new Date()
    lastStartTime = d.getTime()
    next()
}

function end() {
    d = new Date()
    endTime = d.getTime()
    startTime = lastStartTime

    timeTaken = (endTime - startTime)
    timeTakenForAll = averageTime * requestCounter + timeTaken
    requestCounter++
    averageTime = timeTakenForAll / requestCounter
}

app.use(start)
app.use(function (req, res, next) {
    res.on('finish', end)
    next()
})


app.get("/", function (req, res) {
    for (let i = 0; i <= 100000000; i++) {

    }
    res.send(`averageTime: ${averageTime}ms`)

})

app.listen(3000)