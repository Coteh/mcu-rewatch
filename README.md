# mcu-rewatch [![CircleCI](https://circleci.com/gh/Coteh/mcu-rewatch.svg?style=shield)](https://circleci.com/gh/Coteh/mcu-rewatch)[![Netlify Status](https://api.netlify.com/api/v1/badges/31583819-70f1-466e-942d-ce02c04fc7a6/deploy-status)](https://app.netlify.com/sites/mcu-rewatch/deploys)

A nifty little web application I built to keep track of my MCU rewatch progress in anticipation of the release of Avengers: Endgame.

![Preview](Preview.gif "Preview Image")

## Features

- Order MCU films by:
    - Release order
    - Chronological order
    - Release order (with Infinity War saga last)
- Load/Save movie watched status to LocalStorage
- Load/Save MCU movie order to LocalStorage

## Development Setup

1. Navigate to folder and run `npm install` to install all node dependencies.

1. Run `npm run vuetype` to generate TypeScript declaration (`.d.ts`) files for Vue components.

1. Run `npm run dl-posters` to download MCU movie posters from IMDb if they haven't already been downloaded.

1. Run `npm run build` to build webpack bundle from source files.

1. Run `npm start` to run the server (currently just a static-serving Express server).

## Motivation

Previously, I was using a layered image in GIMP to keep track my MCU rewatch progress and export it out as an image to show my friends. This was sufficient for my needs, and I used this approach last year for my rewatch leading up to Infinity War to track my progress. However, this time around I wanted to see if it would be possible to streamline this process and make it look flashier to boot.

What resulted from this idea is a simple to use tool to quickly keep track of progress with persistent storage of your progress to the browser using LocalStorage. I personally found it convenient, as I was able to easily mark the movies I've seen, clip the screenshot portion using macOS's Screen Capture tool to my clipboard, and easily paste that into the chat conversation with my friends to show them my progress.

I also thought this would be a good first project to get my feet wet with Vue, so there's that. :)

## Adding a Movie
To add a future MCU film, [check the wiki for a step-by-step](https://github.com/Coteh/mcu-rewatch/wiki).

## Issues
- Improve the look of the ordering dropdown with vue-select
- Condense webpack build if possible
- See the [Issues](https://github.com/Coteh/mcu-rewatch/issues) page for more

## Future Additions?
- One click save to PNG, JPEG, etc.
- Export movie progress as a sharable link (perhaps a unique string generated based off of progress data and saved order?)
