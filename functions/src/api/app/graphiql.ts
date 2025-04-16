/* eslint-disable max-len */
import * as core from 'express-serve-static-core';
import shopify from '../../shopify.server';
import {
  SHOPIFY_APP_URL,
} from '../../../shopify.app.json';
import {Session} from '@shopify/shopify-api';

const helper = {
  create: async (session: Session) => {
    const client = new shopify.api.clients.Graphql({session});
    const response = await client.request(
      `#graphql
        mutation CarrierServiceCreate($input: DeliveryCarrierServiceCreateInput!) {
          carrierServiceCreate(input: $input) {
            carrierService {
              id
              name
              callbackUrl
              active
              supportsServiceDiscovery
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      {
        variables: {
          input: {
            name: 'babeenioverstock: Custom Carrier Service',
            callbackUrl: `https://${SHOPIFY_APP_URL}/api/storefront/carrier-services`,
            supportsServiceDiscovery: true,
            active: true,
          },
        },
      }
    );

    return response.data.carrierServiceCreate;
  },
  read: async (session: Session) => {
    const client = new shopify.api.clients.Graphql({session});
    const response = await client.request(
      `#graphql
        query CarrierServices {
          carrierServices(first: 250) {
            edges {
              node {
                id
                name
                callbackUrl
                active
                supportsServiceDiscovery
              }
            }
          }
        }
      `
    );

    return response.data.carrierServices.edges.find((edge: {node: {id: string; name: string}}) => edge.node.name === 'babeenioverstock: Custom Carrier Service')?.node;
  },
  update: async (session: Session, id: string) => {
    const client = new shopify.api.clients.Graphql({session});
    const response = await client.request(
      `#graphql
        mutation CarrierServiceUpdate($input: DeliveryCarrierServiceUpdateInput!) {
          carrierServiceUpdate(input: $input) {
            carrierService {
              id
              name
              callbackUrl
              active
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      {
        variables: {
          input: {
            id: id,
            callbackUrl: `https://${SHOPIFY_APP_URL}/api/storefront/carrier-services`,
          },
        },
      }
    );

    return response.data.carrierServiceUpdate;
  },
  delete: async (session: Session, id: string) => {
    const client = new shopify.api.clients.Graphql({session});
    const response = await client.request(
      `#graphql
        mutation CarrierServiceDelete($id: ID!) {
          carrierServiceDelete(id: $id) {
            userErrors {
              field
              message
            }
          }
        }
      `,
      {
        variables: {id},
      }
    );

    return response.data.carrierServiceDelete;
  },
};

export default (app: core.Express) => {
  app.post('/api/app/graphiql/carrier-service-sync', async (req, res) => {
    const session = res.locals.shopify.session as Session;
    const carrierService = await helper.read(session);
    if (!carrierService) {
      const response = await helper.create(session);
      if (response.userErrors.length) {
        res.status(400).send(response.userErrors);
        return;
      }
    } else if (carrierService.callbackUrl !== `https://${SHOPIFY_APP_URL}/api/storefront/carrier-services`) {
      const response = await helper.update(session, carrierService.id);
      if (response.userErrors.length) {
        res.status(400).send(response.userErrors);
        return;
      }
    } else {
      res.status(200).send('No changes needed');
    }
    res.status(200).send('Carrier service created/updated');
  });
  app.delete('/api/app/graphiql/carrier-service', async (req, res) => {
    const session = res.locals.shopify.session as Session;
    const carrierService = await helper.read(session);
    if (carrierService) {
      const response = await helper.delete(session, carrierService.id);
      if (response.userErrors.length) {
        res.status(400).send(response.userErrors);
        return;
      }
    }
    res.status(200).send('Carrier service deleted');
  });
};
