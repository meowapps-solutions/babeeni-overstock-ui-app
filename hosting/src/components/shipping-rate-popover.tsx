import { useState, useCallback } from 'react';
import { Button, Popover, ActionList } from '@shopify/polaris';
import {
  MenuHorizontalIcon,
} from '@shopify/polaris-icons';
import { useAppBridge } from '@shopify/app-bridge-react';
import { ShippingZone } from '../../../functions/src/api/app/types';
import ShippingZoneModal from './shipping-zone-modal';
import { useGlobalData } from '../data/global-data-context';

export default function ShippingRatePopover({ shippingZone }: { shippingZone: ShippingZone }) {
  const { id } = shippingZone;
  const [popoverActive, setPopoverActive] = useState(false);
  const { removeShippingZone } = useGlobalData();
  const shopify = useAppBridge();

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const ondelete = async () => {
    if (window.confirm('Are you sure?')) {
      await removeShippingZone(id);
    }
  };

  const activator = (
    <Button onClick={togglePopoverActive} variant="tertiary" icon={MenuHorizontalIcon} accessibilityLabel="More actions" />
  );

  return (
    <>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[{ content: 'Edit rate', onAction: () => { togglePopoverActive(); shopify.modal.show(`my-modal-${id}`); } }, { content: 'Delete', destructive: true, onAction: () => { togglePopoverActive(); ondelete(); } }]}
        />
      </Popover>
      <ShippingZoneModal id={`my-modal-${id}`} country={shippingZone.country} shippingZone={shippingZone} />
    </>
  );
}