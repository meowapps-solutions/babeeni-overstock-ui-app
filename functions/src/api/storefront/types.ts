export interface CarrierServices {
  rate: {
    destination: {
      country: string;
    };
    items: {
      quantity: number;
    }[];
  };
}
