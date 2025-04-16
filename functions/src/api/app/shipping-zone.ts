import * as core from 'express-serve-static-core';
import {ShippingZone} from './types';
import {db} from '../../firebase.server';

export const shippingZoneStorage = {
  collection: db.collection('shopify-shipping-zone'),
  async storeShippingZone(shippingZone: ShippingZone) {
    const existsSnapshot = await this.loadShippingZone(shippingZone.id);
    if (existsSnapshot) {
      const currentSnapshot: ShippingZone = {
        ...existsSnapshot,
        ...shippingZone,
      };
      await this.collection.doc(shippingZone.id).set(currentSnapshot);
      return currentSnapshot;
    }
    await this.collection.doc(shippingZone.id).set(shippingZone);
    return true;
  },
  async loadShippingZone(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return undefined;
    }
    return doc.data() as ShippingZone;
  },
  async findByShop(shop: string) {
    const snapshot = await this.collection.where('shop', '==', shop).get();
    const shippingZones: ShippingZone[] = [];
    snapshot.forEach((doc) => {
      shippingZones.push(doc.data() as ShippingZone);
    });
    return shippingZones;
  },
};

export default (app: core.Express) => {
  app.post('/api/app/shipping-zone', async (req, res) => {
    const {shop} = req.query as { shop: string };
    if (!shop) {
      return res.status(400).json({error: 'Missing shop parameter'});
    }

    const body = req.body as ShippingZone;
    await shippingZoneStorage.storeShippingZone({...body, shop});
    return res.status(200).json({message: 'Shipping zone stored successfully'});
  });
  app.get('/api/app/shipping-zone', async (req, res) => {
    const {shop} = req.query as { shop: string };
    if (!shop) {
      return res.status(400).json({error: 'Missing shop parameter'});
    }

    const shippingZones = await shippingZoneStorage.findByShop(shop);
    return res.status(200).json(shippingZones);
  });
  app.delete('/api/app/shipping-zone/:shippingZoneId', async (req, res) => {
    const {shippingZoneId} = req.params as { shippingZoneId: string };
    if (!shippingZoneId) {
      return res.status(400).json({error: 'Missing shippingZoneId parameter'});
    }

    await shippingZoneStorage.collection.doc(shippingZoneId).delete();
    return res.status(200)
      .json({message: 'Shipping zone deleted successfully'});
  });
};
