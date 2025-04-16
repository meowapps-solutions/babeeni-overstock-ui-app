import {
  reactExtension,
  Checkbox,
  useApplyAttributeChange,
  useInstructions,
  useAttributes,
  useCartLines,
  useApplyCartLinesChange,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useMemo, useState } from 'react';

// 1. Choose an extension target
export default reactExtension(
  'purchase.checkout.cart-line-list.render-after',
  () => <Extension />,
);

function Extension() {
  const applyAttributeChange = useApplyAttributeChange();
  const applyCartLinesChange = useApplyCartLinesChange()
  const instructions = useInstructions();
  const attributes = useAttributes();
  const lines = useCartLines();
  const lotMerge = useMemo(() => attributes.find((attr) => attr.key === '_LotMerge')?.value, [attributes]);
  // const isLotMode = lines.filter(line => line.attributes.find((attr) => attr.key === '_LotTitle')).length > 1 ||
  //   lines.some(line => line.lineComponents.filter(line2 => line2.attributes.find((attr) => attr.key === '_LotTitle')).length > 1);
  const isLotMode = true; // updated: always true for babeenioverstock rules
  let [hasCompleted, setHasCompleted] = useState(false);

  if (!isLotMode) {
    return null;
  }

  useEffect(() => {
    Promise.all(
      lines.filter(line => !line.attributes.find((attr) => attr.key === '_LotImage'))
        .map(line =>
          line.lineComponents.length > 0 ?
            applyCartLinesChange({
              type: 'updateCartLine',
              id: line.id,
              attributes: [...line.attributes, {
                key: '_LotImage',
                value: line.lineComponents[0].merchandise.image.url,
              }]
            }) :
            applyCartLinesChange({
              type: 'updateCartLine',
              id: line.id,
              attributes: [...line.attributes, {
                key: '_LotImage',
                value: line.merchandise.image.url,
              }]
            })
        )
    ).then(() => {
      setHasCompleted(true)
    });
  }, [lines.length > 0])

  useEffect(() => {
    if (lotMerge === undefined || lotMerge === 'undefined' && hasCompleted) {
      applyAttributeChange({
        key: '_LotMerge',
        type: 'updateAttribute',
        value: 'yes',
      });
    }
  }, [lotMerge === undefined || lotMerge === 'undefined' && hasCompleted]);

  // 2. Render a UI
  return (
    <Checkbox checked={lotMerge === 'yes'} onChange={onCheckboxChange}>Combine multiple items into one</Checkbox>
  );

  async function onCheckboxChange(isChecked) {
    // 3. Check if the API is available
    if (!instructions.attributes.canUpdateAttributes) {
      console.error('Attributes cannot be updated in this checkout',);
      return;
    }

    // 4. Call the API to modify checkout
    const result = await applyAttributeChange({
      key: '_LotMerge',
      type: 'updateAttribute',
      value: isChecked ? 'yes' : 'no',
    });
    console.log('applyAttributeChange result', result,);
  }
}
