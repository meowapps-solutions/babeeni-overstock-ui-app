import countryCode from '../../../functions/src/countryCode.json';

export const getCountryName = (value: string): string => {
  return countryCode.find(({options}) => options.find(({value: v}) => v === value))?.options.find(({value: v}) => v === value)?.label || '';
};

export const getCountryImage = (value: string): string => {
  return countryCode.find(({options}) => options.find(({value: v}) => v === value))?.options.find(({value: v}) => v === value)?.image || 'https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/fallback-MDv5V6ul4gaJ.svg';
};