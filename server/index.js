// Express
import express from 'express';

// React
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../client/App';
import Html from './Html';
import WDM from './WDM'

const app = express();
const port = 3000;

app.use(WDM);

app.get('/', function (req, res, next) {

    let preloadState = {
        text: 'Server-Side Rendering'
    };

    let renderProps = {
        preloadState: `window.__PRELOADED_STATE__ =${JSON.stringify(preloadState).replace(/</g, '\\u003c')}`,
        script: '/build/client.bundle.js'
    };

    ReactDOMServer.renderToNodeStream(
        <Html {...renderProps}>
            <App data={preloadState}/>
        </Html>
    ).pipe(res);
});

app.listen(port, () => {
    console.log('http://localhost:3000')
});