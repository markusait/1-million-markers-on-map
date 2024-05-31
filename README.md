## Rendering 1 million markers on map example

Initialize a map with symbol markers based on geoJson generated on server. The app dynamicaly fetches markers from server based on the viewport.

![Demo gif](https://i.imgur.com/nbuShVF.gif)


### Run it

    npm install
    npm run dev

    open http://localhost:3000/

Replace the [API key](https://docs.mapbox.com/help/getting-started/access-tokens/) in `.env.local `.

### Access token

    touch .env.local 
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=YOUR_API_KEY_HERE

Runs the app from http://localhost:3000
