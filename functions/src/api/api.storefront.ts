import {onRequest} from 'firebase-functions/v2/https';
import express from 'express';
import carrierServicesRoutes from './storefront/carrier-services';

const app = express();

carrierServicesRoutes(app);

export default onRequest(app);
