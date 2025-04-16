import { useEffect, useMemo } from 'react';
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  InlineStack,
  Bleed,
  Box,
  SkeletonThumbnail,
  SkeletonBodyText,
  SkeletonDisplayText,
  Icon,
} from '@shopify/polaris';
import {
  RefreshIcon,
} from '@shopify/polaris-icons';
import ShippingRatePopover from '../components/shipping-rate-popover';
import AddShippingZonePopover from '../components/add-shipping-zone-popover';
import { ShippingZone } from '../../../functions/src/api/app/types';
import { getCountryImage, getCountryName } from '../utils/country';
import { useGlobalData } from '../data/global-data-context';
import shippingZonesJson from '../data/shipping-zones/shippingZones.json';

export default function App() {
  const { loading, shippingZones, isSyncing, updateShippingZone } = useGlobalData();
  const shippingZonesByCountry = useMemo(() => {
    return shippingZones.reduce<{ [country: string]: ShippingZone[] }>((acc, zone: ShippingZone) => {
      acc[zone.country] = acc[zone.country] || [];
      acc[zone.country].push(zone);
      return acc;
    }, {});
  }, [shippingZones]);

  useEffect(() => {
    (async () => {
      if (loading === false) {
        const shop = shopify.config.shop;

        if (shop) {
          if (location.href.includes('generate')) {
            for (const shippingZone of shippingZonesJson) {
              await updateShippingZone({ ...shippingZone, shop: shop });
            }
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Card>
              <Bleed marginBlockStart="400" marginInline="400">
                <Box background="bg-surface-secondary" padding="400">
                  <InlineStack gap="200" blockAlign="center">
                    <InlineStack gap="200" blockAlign="center">
                      <Text as="p" variant="headingSm">Shipping zones</Text>
                      {isSyncing && (
                        <Icon
                          source={RefreshIcon}
                          tone="base"
                        />
                      )}
                    </InlineStack>
                    <div style={{ marginLeft: 'auto' }}>
                      <AddShippingZonePopover />
                    </div>
                  </InlineStack>
                </Box>
              </Bleed>

              {loading && [1, 2].map((_, index) => (
                <Box borderBlockStartWidth={index !== 0 ? '025' : undefined} borderColor={index !== 0 ? 'border-secondary' : undefined}>
                  <Box paddingBlock="200">
                    <InlineStack gap="200" blockAlign="center">
                      <SkeletonThumbnail size="extraSmall" />
                      <div style={{ width: 100 }}><SkeletonBodyText lines={1} /></div>
                    </InlineStack>
                  </Box>

                  {[1, 2, 3].map((id) => (
                    <Box key={`shipping-rate-${id}`} paddingBlock="200" borderBlockStartWidth="025" borderColor="border-secondary">
                      <InlineStack gap="200" blockAlign="center">
                        <div style={{ width: 102 }}>
                          <SkeletonDisplayText size="medium" />
                        </div>

                        <div style={{ marginLeft: 'auto', width: 40 }}>
                          <SkeletonBodyText lines={1} />
                        </div>
                      </InlineStack>
                    </Box>
                  ))}
                </Box>
              ))}

              {Object.keys(shippingZonesByCountry).sort((a, b) => getCountryName(a).localeCompare(getCountryName(b))).map((country, index) => (
                <Box borderBlockStartWidth={index !== 0 ? '025' : undefined} borderColor={index !== 0 ? 'border-secondary' : undefined}>
                  <Box paddingBlock="200">
                    <InlineStack gap="200" blockAlign="center">
                      <img style={{ height: 24, borderRadius: 4 }} src={getCountryImage(country)} alt={country} />
                      <Text as="p" variant="bodyMd" tone="subdued">{getCountryName(country)} • {country}</Text>
                    </InlineStack>
                  </Box>

                  {shippingZonesByCountry[country].map((shippingZone) => (
                    <Box key={`shipping-rate-${shippingZone.id}`} paddingBlock="200" borderBlockStartWidth="025" borderColor="border-secondary">
                      <InlineStack gap="200" blockAlign="center">
                        <Text as="p" variant="bodyMd" tone='base'>
                          {shippingZone.name}
                          <Text as="p" variant="bodySm" tone="subdued">
                            {shippingZone.description}
                          </Text>
                        </Text>

                        <div style={{ marginLeft: 'auto' }}>
                          <ShippingRatePopover shippingZone={shippingZone} />
                        </div>
                      </InlineStack>
                    </Box>
                  ))}
                </Box>
              ))}

              <Bleed marginBlockEnd="400" />
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
