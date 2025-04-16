// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

// updated: always true for babeenioverstock rules
// function groupCartLinesByLotTitle(cartData) {
//   const groupedLines = {};

//   if (cartData && cartData.cart && cartData.cart.lines) {
//     for (const line of cartData.cart.lines) {
//       const lotTitle = line.lotTitle ? line.lotTitle.value : null; // Get the lotTitle value, handle null

//       if (!groupedLines[lotTitle]) {
//         // If the lotTitle doesn't exist as a key, create a new array for it.
//         groupedLines[lotTitle] = [];
//       }

//       groupedLines[lotTitle].push(line);
//     }
//   }

//   return groupedLines;
// }

function groupCartLinesByProductId(cartData) {
  const groupedLines = {};

  if (cartData && cartData.cart && cartData.cart.lines) {
    for (const line of cartData.cart.lines) {
      const productId = line.merchandise?.product?.id;

      if (!groupedLines[productId]) {
        groupedLines[productId] = [];
      }

      groupedLines[productId].push(line);
    }
  }

  return groupedLines;
}

function removeImageSizeSuffix(url) {
  const regex = /_\d+x\d+(?=\.\w+)/;
  const newUrl = url.replace(regex, '');

  return newUrl;
}

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const groupedCart = groupCartLinesByProductId(input);
  const parentVariantId = "gid://shopify/ProductVariant/44982804840647"

  if (input.cart.lotMerge?.value === 'yes') {
    return {
      operations: Object.keys(groupedCart).map((key) => {
        if (key === 'null') {
          return null
        }
        return {
          merge: {
            cartLines: groupedCart[key].map((line) => {
              return {
                cartLineId: line.id,
                quantity: line.quantity,
              };
            }),
            parentVariantId: parentVariantId || groupedCart[key][0].merchandise.id,
            title: groupedCart[key][0].lotTitle?.value || groupedCart[key][0].merchandise?.product?.title,
            image: groupedCart[key][0].lotImage?.value ? {
              url: removeImageSizeSuffix(groupedCart[key][0].lotImage?.value),
            } : undefined
          }
        }
      }).filter((x) => x !== null)
        .filter((x) => x.merge.cartLines.length > 1),
    };
  }

  return NO_CHANGES;
};