import { useState, useCallback, useEffect } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Button, Popover, FormLayout } from '@shopify/polaris';
import { v4 as uuidv4 } from 'uuid';
import CountriesAutocomplete from './countries-autocomplete';
import ShippingZoneModal from './shipping-zone-modal';

export default function AddShippingZonePopover() {
  const [popoverActive, setPopoverActive] = useState(false);
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [key, setKey] = useState<string>(uuidv4());
  const shopify = useAppBridge();

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((popoverActive) => !popoverActive);
  }, []);

  const activator = (
    <Button variant="plain" onClick={togglePopoverActive}>Add shipping zone</Button>
  );

  useEffect(() => {
    if (popoverActive) {
      setKey(uuidv4());
    }
  }, [popoverActive]);

  return (
    <>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        preferredAlignment="right"
        sectioned
      >
        <FormLayout>
          <CountriesAutocomplete label='Shipping zone' error={error} onSelect={(selected) => { setError(undefined); setCountry(selected[0]); }} />
          <Button size="slim" onClick={() => {
            if (!country) {
              setError('Please select a country');
              return;
            }
            togglePopoverActive();
            shopify.modal.show('shipping-zone-modal');
          }}>Add rate</Button>
        </FormLayout>
      </Popover>
      {country && shopify.config.shop && (
        <ShippingZoneModal key={key} id="shipping-zone-modal" country={country} />
      )}
    </>
  );
}