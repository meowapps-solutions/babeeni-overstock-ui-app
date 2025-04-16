import { useState } from 'react';
import { BlockStack, Box, Button, InlineStack, Select, Text, TextField } from '@shopify/polaris';
import {
  PlusCircleIcon,
} from '@shopify/polaris-icons';
import { Modal, TitleBar, useAppBridge } from '@shopify/app-bridge-react';
import { v4 as uuidv4 } from 'uuid';
import { ShippingZone } from '../../../functions/src/api/app/types';
import { getCountryName } from '../utils/country';
import { useGlobalData } from '../data/global-data-context';

export default function ShippingZoneModal({ id, country, shippingZone }: { id: string, country: string, shippingZone?: ShippingZone }) {
  const [appState, setAppState] = useState({
    name: shippingZone?.name || 'Standard',
    description: shippingZone?.description,
    additional_shipping_fee: shippingZone?.additional_shipping_fee || 0,
    rates: shippingZone?.rates || [{ from: 1, to: undefined, price: 0, pricing_mode: 'flat' }],
  });
  const [loading, setLoading] = useState(false);
  const shopify = useAppBridge();
  const { updateShippingZone } = useGlobalData();

  const onsubmit = async () => {
    if (shopify.config.shop === undefined) {
      throw new Error('Shopify shop is undefined');
    }

    const newShippingZone: ShippingZone = {
      ...shippingZone,
      ...appState,
      country,
      id: shippingZone?.id || uuidv4(),
      shop: shopify.config.shop,
    };

    setLoading(true);
    updateShippingZone(newShippingZone);
    setLoading(false);
    shopify.modal.hide(id);
  };

  return (
    <Modal id={id}>
      <Box padding="300">
        <BlockStack gap="300">
          <TextField
            label="Shipping zone"
            value={getCountryName(country)}
            autoComplete="off"
            disabled
          />

          <TextField
            label="Custom rate name"
            value={appState.name}
            onChange={(value => {
              setAppState(prev => ({ ...prev, name: value }));
            })}
            autoComplete="off"
            maxLength={128}
            showCharacterCount
          />

          <TextField
            label="Custom delivery description (optional)"
            value={appState.description}
            onChange={(value => {
              setAppState(prev => ({ ...prev, description: value }));
            })}
            autoComplete="off"
          />

          <TextField
            label="Additional shipping fee (percentage)"
            value={String(appState.additional_shipping_fee)}
            onChange={(value => {
              setAppState(prev => ({ ...prev, additional_shipping_fee: Number(value) }));
            })}
            autoComplete="off"
            type='number'
            suffix="%"
          />

          <BlockStack gap="100">
            <Text as="span" variant="bodyMd">Shipping rates</Text>
            <Box padding="300" borderWidth="025" borderRadius='200' borderColor="border-secondary" background="bg-surface-secondary">
              <BlockStack gap="200">
                {appState.rates.map(({ from, to, price, pricing_mode }, index) => (
                  <Box padding="200" borderWidth="025" borderRadius='200' borderColor="border-secondary" background="bg-surface">
                    <InlineStack gap="200" wrap={false}>
                      <TextField
                        label="From"
                        value={String(from)}
                        onChange={(value) => {
                          const newRates = [...appState.rates];
                          newRates[index].from = Number(value);
                          setAppState(prev => ({ ...prev, rates: newRates }));
                        }}
                        autoComplete="off"
                        type='number'
                      />
                      <TextField
                        label="To"
                        value={String(to)}
                        onChange={(value) => {
                          const newRates = [...appState.rates];
                          newRates[index].to = Number(value);
                          setAppState(prev => ({ ...prev, rates: newRates }));
                        }}
                        autoComplete="off"
                        type='number'
                      />
                      <TextField
                        label="Price"
                        value={String(price)}
                        onChange={(value) => {
                          const newRates = [...appState.rates];
                          newRates[index].price = Number(value);
                          setAppState(prev => ({ ...prev, rates: newRates }));
                        }}
                        autoComplete="off"
                        type='number'
                        prefix="$"
                        connectedRight={
                          <Select
                            labelHidden
                            label="Mode"
                            options={[{ label: 'Flat', value: 'flat' }, { label: 'Per unit', value: 'per_unit' }]}
                            onChange={(value) => {
                              const newRates = [...appState.rates];
                              newRates[index].pricing_mode = value;
                              setAppState(prev => ({ ...prev, rates: newRates }));
                            }}
                            value={pricing_mode}
                          />
                        }
                      />
                    </InlineStack>
                  </Box>
                ))}
                <Button
                  variant="tertiary"
                  icon={PlusCircleIcon}
                  textAlign="left"
                  disabled={appState.rates.length && appState.rates.at(-1)?.to === undefined || undefined}
                  onClick={() => {
                    setAppState((prev) => ({
                      ...prev,
                      rates: [...prev.rates, { from: (prev.rates.at(-1)?.to || 0) + 1, to: undefined, price: 0, pricing_mode: prev.rates.at(-1)?.pricing_mode || 'flat' }],
                    }));
                  }}>New item</Button>
              </BlockStack>
            </Box>
          </BlockStack>
        </BlockStack>
      </Box>

      <TitleBar title={shippingZone?.name || 'Add rate'}>
        <button variant="primary" onClick={() => { onsubmit(); }} disabled={loading}>Done</button>
        <button onClick={() => { shopify.modal.hide(id); }} disabled={loading}>Cancel</button>
      </TitleBar>
    </Modal>
  );
}