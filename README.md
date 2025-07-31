# ISO Country Codes

This is for Raycast only, and it'll add a new command called `iso`.

![Example image of this extension. It shows a search box at the top with the letters "br" in it. Below it, two columns display the results: on the left, a list of countries. On the right, Detailed information on the selected country, such as country name, ISO-2, ISO-3 and currency codes.](./assets/example.jpg)

## Usage:
1. Type `iso` in Raycast
1. Hit [return / Enter] to open the extension
1. Type your query:
    1. 2 letters will prioritize ISO2 code, followed by ISO3 code, currency codes, and finally name
    1. 3 letters will prioritize ISO3, followed by currency codes, and finally name
    1. 4+ letters will got directly to name search

## Install

1. `npm install`
1. `npm run dev`

That should get you the extension installed on your local Raycast. You can then stop the dev server and continue using the extensions without issues.

For more info: https://developers.raycast.com/

## Data sources
Check the `extractorScript.js` file for more information on where this info was sourced from. All data is stored in `data.json`