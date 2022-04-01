#!/bin/bash

if screen -list | grep -q "\.ytdl-web"; then
    echo "Web server is already running!  Type screen -r ytdl-web."
    exit 1
fi

screen -dmS ytdl-web nodemon ./index.js