# ISO Country Codes

This is for Raycast only, and it'll add a new command called `iso`.

## Usage:
1. Type `iso` in Raycast
1. Hit [return] to open the extension
1. Type your query:
    1. 2 letters will prioritize ISO2, followed by ISO3, currency codes, and finally name
    1. 3 letters will prioritize ISO3, followed by currency codes, and finally name
    1. 4+ letters will got directly to name search

## Install

1. `npm install`
1. `npm run dev`

That should get you the extension installed on your local Raycast. You can then stop the dev server and continue using the extensions without issues.

For more info: https://developers.raycast.com/

## Data sources
Check the `extractorScript.js` file for more information on where this info was sourced from. All data is stored in `data.json`