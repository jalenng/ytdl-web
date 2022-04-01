const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

const express = require('express')
const app = express()
const root = path.join(__dirname, '..')
const port = 8081

app.get('/', (req, res) => {
    res.sendFile(`src/index.html`, { root: root })
})

app.get('/download', (req, res) => {
    try {
        // Get the url query
        const url = req.query.url

        // Check if the url is valid
        const valid = ytdl.validateID(url) || ytdl.validateURL(url)
        if (!valid) {
            throw new Error()
        }

        // Create write stream
        const id = ytdl.getVideoID(url)
        const filepath = `${root}/vids/${id}.mp4`
        const stream = fs.createWriteStream(filepath)

        // Download the video and save it to the server
        ytdl(url, { format: 'mp4' }).pipe(stream)

        // Send the video to the client
        stream.on('finish', () => {
            res.download(filepath)
        })
    } catch (err) {
        res.sendFile(`src/error.html`, { root: root })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})