import * as core from 'express-serve-static-core';
import {CarrierServices} from './types';
import {shippingZoneStorage} from '../app/shipping-zone';
import {Session} from '@shopify/shopify-api';

export default (app: core.Express) => {
  app.post('/api/storefront/carrier-services', async (req, res) => {
    try {
      const session = res.locals.shopify.session as Session;
      const body = req.body as CarrierServices;
      const destinationCountry = body.rate.destination.country;
      const piecesCount = body.rate.items.map((item) => item.quantity)
        .reduce((a, b) => a + b, 0);

      const shippingZones = (await shippingZoneStorage.findByShop(session.shop))
        .filter((zone) => zone.country === destinationCountry);
      if (shippingZones.length === 0) {
        // eslint-disable-next-line max-len
        throw new Error(`Shipping zone not found for country: ${destinationCountry}`);
      }

      const shippingRates = shippingZones.map((zone) => {
        const rate = zone.rates.find((rate) => {
          return (rate.from === null || rate.from <= piecesCount) &&
            (rate.to === undefined || piecesCount <= rate.to);
        });
        if (rate === undefined) {
          return undefined;
        }

        const price = rate.pricing_mode === 'per_unit' ?
          rate.price * piecesCount :
          rate.price;

        return {
          service_name: zone.name,
          total_price: price * (100 + zone.additional_shipping_fee) / 100,
        };
      }).filter((item) => item !== undefined) as {
        service_name: string;
        total_price: number;
      }[];
      if (shippingRates.length === 0) {
        // eslint-disable-next-line max-len
        throw new Error(`Shipping rate not found for country: ${destinationCountry}`);
      }

      res.json({
        rates: shippingRates.map((item) => ({
          service_name: item.service_name,
          service_code: 'ON',
          total_price: item.total_price * 100,
          currency: 'USD',
        })),
      });
    } catch (error) {
      console.error(error);
      res.json({rates: []});
    }
  });
};
