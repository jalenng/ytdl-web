#!/bin/bash

if ! screen -list | grep -q "\.ytdl-web"; then
  echo "Web server is not currently running!"
  exit 1
fi

screen -S ytdl-web -X quit