export interface ShippingZone {
  id: string,
  name: string,
  description?: string,
  additional_shipping_fee: number,
  rates: {
    from: number,
    to?: number,
    pricing_mode: 'flat' | 'per_unit' | string,
    price: number
  }[],
  country: string,
  shop: string,
}
