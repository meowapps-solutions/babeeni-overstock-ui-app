import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';
import shopify from '../shopify.server';
import shippingZoneRoutes from './app/shipping-zone';
import graphiqlRoutes from './app/graphiql';

const app = express();

app.use(shopify.validateAuthenticatedSession());

app.get('/api/app/', (_, res) => {
  res.send('Hello world!');
});

shippingZoneRoutes(app);
graphiqlRoutes(app);

export default onRequest(app);
