const uuidv4 = require('uuid').v4;
const fs = require('fs');
const x = require('../../../../functions/src/countryCode.json');
const y = [
  {
    range: [1, 5],
    price_per_item: false, // Giá cố định
    price: {
      'UzS-fedex': 37.00,
      'UzS-ups': 47.00,
      'TH': 21,
      'SG': 18,
      'HK': 17,
      'MY': 24,
      'CN': 37,
      'IN': 22,
      'CA': 38,
      'MX': 38,
      'AU': 32,
      'PH': 26,
      'ID': 26,
      'MO': 23,
      'JP': 29,
      'KR': 25,
      'GB': 35,
      '_Europe': 35,
      'IE': 68,
      'DK': 68,
      'AE': 29,
      'QA': 29,
      'KW': 29,
      'SA': 29,
    },
  },
  {
    range: [6, 10],
    price_per_item: false,
    price: {
      'UzS-fedex': 50.00,
      'UzS-ups': 53.00,
      'TH': 25,
      'SG': 22,
      'HK': 21,
      'MY': 29,
      'CN': 47,
      'IN': 29,
      'CA': 51,
      'MX': 51,
      'AU': 41,
      'PH': 31,
      'ID': 31,
      'MO': 27,
      'JP': 37,
      'KR': 32,
      'GB': 48,
      '_Europe': 48,
      'IE': 91,
      'DK': 91,
      'AE': 40,
      'QA': 40,
      'KW': 40,
      'SA': 40,
    },
  },
  {
    range: [11, 15],
    price_per_item: false,
    price: {
      'UzS-fedex': 61.00,
      'UzS-ups': 66.00,
      'TH': 27,
      'SG': 24,
      'HK': 23,
      'MY': 32,
      'CN': 49,
      'IN': 32,
      'CA': 57,
      'MX': 57,
      'AU': 46,
      'PH': 34,
      'ID': 34,
      'MO': 30,
      'JP': 41,
      'KR': 36,
      'GB': 54,
      '_Europe': 54,
      'IE': 100,
      'DK': 100,
      'AE': 45,
      'QA': 45,
      'KW': 45,
      'SA': 45,
    },
  },
  {
    range: [16, 20],
    price_per_item: false,
    price: {
      'UzS-fedex': 73.00,
      'UzS-ups': 79.00,
      'TH': 31,
      'SG': 27,
      'HK': 26,
      'MY': 35,
      'CN': 57,
      'IN': 38,
      'CA': 69,
      'MX': 69,
      'AU': 54,
      'PH': 38,
      'ID': 38,
      'MO': 33,
      'JP': 48,
      'KR': 42,
      'GB': 64,
      '_Europe': 64,
      'IE': 120,
      'DK': 120,
      'AE': 54,
      'QA': 54,
      'KW': 54,
      'SA': 54,
    },
  },
  {
    range: [21, 25],
    price_per_item: false,
    price: {
      'UzS-fedex': 84.00,
      'UzS-ups': 92.00,
      'TH': 34,
      'SG': 30,
      'HK': 28,
      'MY': 39,
      'CN': 66,
      'IN': 43,
      'CA': 81,
      'MX': 81,
      'AU': 62,
      'PH': 42,
      'ID': 42,
      'MO': 37,
      'JP': 56,
      'KR': 48,
      'GB': 74,
      '_Europe': 74,
      'IE': 139,
      'DK': 139,
      'AE': 62,
      'QA': 62,
      'KW': 62,
      'SA': 62,
    },
  },
  {
    range: [26, 30],
    price_per_item: false,
    price: {
      'UzS-fedex': 95.00,
      'UzS-ups': 103.00,
      'TH': 36,
      'SG': 31,
      'HK': 33,
      'MY': 41,
      'CN': 70,
      'IN': 46,
      'CA': 95,
      'MX': 95,
      'AU': 72,
      'PH': 50,
      'ID': 44,
      'MO': 61,
      'JP': 59,
      'KR': 51,
      'GB': 79,
      '_Europe': 79,
      'IE': 122,
      'DK': 122,
      'AE': 69,
      'QA': 69,
      'KW': 69,
      'SA': 69,
    },
  },
  {
    range: [31, 35],
    price_per_item: false,
    price: {
      'UzS-fedex': 106.00,
      'UzS-ups': 115.00,
      'TH': 39,
      'SG': 33,
      'HK': 35,
      'MY': 45,
      'CN': 78,
      'IN': 51,
      'CA': 106,
      'MX': 106,
      'AU': 80,
      'PH': 54,
      'ID': 48,
      'MO': 66,
      'JP': 66,
      'KR': 57,
      'GB': 87,
      '_Europe': 87,
      'IE': 134,
      'DK': 134,
      'AE': 77,
      'QA': 77,
      'KW': 77,
      'SA': 77,
    },
  },
  {
    range: [36, 40],
    price_per_item: false,
    price: {
      'UzS-fedex': 116.00,
      'UzS-ups': 125.00,
      'TH': 42,
      'SG': 36,
      'HK': 38,
      'MY': 48,
      'CN': 85,
      'IN': 56,
      'CA': 118,
      'MX': 118,
      'AU': 88,
      'PH': 59,
      'ID': 51,
      'MO': 72,
      'JP': 72,
      'KR': 63,
      'GB': 95,
      '_Europe': 95,
      'IE': 147,
      'DK': 147,
      'AE': 85,
      'QA': 85,
      'KW': 85,
      'SA': 85,
    },
  },
  {
    range: [41, 45],
    price_per_item: false,
    price: {
      'UzS-fedex': 127.00,
      'UzS-ups': 134.00,
      'TH': 45,
      'SG': 39,
      'HK': 41,
      'MY': 52,
      'CN': 93,
      'IN': 61,
      'CA': 129,
      'MX': 129,
      'AU': 96,
      'PH': 63,
      'ID': 55,
      'MO': 77,
      'JP': 79,
      'KR': 69,
      'GB': 103,
      '_Europe': 103,
      'IE': 160,
      'DK': 160,
      'AE': 93,
      'QA': 93,
      'KW': 93,
      'SA': 93,
    },
  },
  {
    range: [46, 50],
    price_per_item: false,
    price: {
      'UzS-fedex': 138.00,
      'UzS-ups': 141.00,
      'TH': 48,
      'SG': 41,
      'HK': 43,
      'MY': 55,
      'CN': 101,
      'IN': 66,
      'CA': 141,
      'MX': 141,
      'AU': 104,
      'PH': 67,
      'ID': 59,
      'MO': 82,
      'JP': 86,
      'KR': 74,
      'GB': 112,
      '_Europe': 112,
      'IE': 173,
      'DK': 173,
      'AE': 101,
      'QA': 101,
      'KW': 101,
      'SA': 101,
    },
  },
  {
    range: [51, 55],
    price_per_item: false,
    price: {
      'UzS-fedex': 148.00,
      'UzS-ups': 145.00,
      'TH': 67,
      'SG': 43,
      'HK': 59,
      'MY': 81,
      'CN': 103,
      'IN': 96,
      'CA': 161,
      'MX': 161,
      'AU': 133,
      'PH': 94,
      'ID': 72,
      'MO': 115,
      'JP': 87,
      'KR': 77,
      'GB': 132,
      '_Europe': 132,
      'IE': 177,
      'DK': 177,
      'AE': 124,
      'QA': 124,
      'KW': 124,
      'SA': 124,
    },
  },
  {
    range: [56, 60],
    price_per_item: false,
    price: {
      'UzS-fedex': 159.00,
      'UzS-ups': 150.00,
      'TH': 69,
      'SG': 44,
      'HK': 60,
      'MY': 83,
      'CN': 105,
      'IN': 99,
      'CA': 168,
      'MX': 168,
      'AU': 138,
      'PH': 97,
      'ID': 74,
      'MO': 118,
      'JP': 90,
      'KR': 79,
      'GB': 139,
      '_Europe': 139,
      'IE': 186,
      'DK': 186,
      'AE': 131,
      'QA': 131,
      'KW': 131,
      'SA': 131,
    },
  },
  {
    range: [61, 65],
    price_per_item: false,
    price: {
      'UzS-fedex': 163.00,
      'UzS-ups': 153.00,
      'TH': 71,
      'SG': 45,
      'HK': 62,
      'MY': 85,
      'CN': 108,
      'IN': 103,
      'CA': 176,
      'MX': 176,
      'AU': 143,
      'PH': 99,
      'ID': 76,
      'MO': 121,
      'JP': 92,
      'KR': 81,
      'GB': 145,
      '_Europe': 145,
      'IE': 195,
      'DK': 195,
      'AE': 138,
      'QA': 138,
      'KW': 138,
      'SA': 138,
    },
  },
  {
    range: [66, 70], // Giả định "65-70" trong hình là 66-70
    price_per_item: false,
    price: {
      'UzS-fedex': 166.00,
      'UzS-ups': 156.00,
      'TH': 72,
      'SG': 46,
      'HK': 64,
      'MY': 88,
      'CN': 111,
      'IN': 107,
      'CA': 183,
      'MX': 183,
      'AU': 147,
      'PH': 102,
      'ID': 78,
      'MO': 124,
      'JP': 94,
      'KR': 83,
      'GB': 151,
      '_Europe': 151,
      'IE': 203,
      'DK': 203,
      'AE': 145,
      'QA': 145,
      'KW': 145,
      'SA': 145,
    },
  },
  {
    range: [71, 75],
    price_per_item: false,
    price: {
      'UzS-fedex': 169.00,
      'UzS-ups': 158.00,
      'TH': 74,
      'SG': 48,
      'HK': 65,
      'MY': 90,
      'CN': 114,
      'IN': 110,
      'CA': 190,
      'MX': 190,
      'AU': 152,
      'PH': 104,
      'ID': 80,
      'MO': 127,
      'JP': 97,
      'KR': 85,
      'GB': 158,
      '_Europe': 158,
      'IE': 212,
      'DK': 212,
      'AE': 151,
      'QA': 151,
      'KW': 151,
      'SA': 151,
    },
  },
  {
    range: [76, 100],
    price_per_item: true, // Giá mỗi Kg
    price: { // Giá mỗi Kg
      'UzS-fedex': 2.50,
      'UzS-ups': 2.90,
      'TH': 0.91,
      'SG': 0.59,
      'HK': 0.81,
      'MY': 1.11,
      'CN': 1.42,
      'IN': 1.45,
      'CA': 2.47,
      'MX': 2.47,
      'AU': 2.01,
      'PH': 1.30,
      'ID': 0.99,
      'MO': 1.58,
      'JP': 1.22,
      'KR': 1.07,
      'GB': 2.11,
      '_Europe': 2.11,
      'IE': 2.84,
      'DK': 2.84,
      'AE': 2.09,
      'QA': 2.09,
      'KW': 2.09,
      'SA': 2.09,
    },
  },
  {
    range: [101, 150],
    price_per_item: true,
    price: {
      'UzS-fedex': 2.30,
      'UzS-ups': 2.40,
      'TH': 0.94,
      'SG': 0.61,
      'HK': 0.83,
      'MY': 1.14,
      'CN': 1.51,
      'IN': 1.51,
      'CA': 2.22,
      'MX': 2.22,
      'AU': 2.21,
      'PH': 1.33,
      'ID': 1.01,
      'MO': 1.62,
      'JP': 1.24,
      'KR': 1.09,
      'GB': 2.17,
      '_Europe': 2.17,
      'IE': 2.47,
      'DK': 2.47,
      'AE': 2.14,
      'QA': 2.14,
      'KW': 2.14,
      'SA': 2.14,
    },
  },
  {
    range: [151, 200],
    price_per_item: true,
    price: {
      'UzS-fedex': 2.10,
      'UzS-ups': 2.20,
      'TH': 0.80,
      'SG': 0.60,
      'HK': 0.80,
      'MY': 1.00,
      'CN': 1.40,
      'IN': 1.40,
      'CA': 2.00,
      'MX': 2.00,
      'AU': 2.00,
      'PH': 1.20,
      'ID': 1.00,
      'MO': 1.40,
      'JP': 1.20,
      'KR': 1.00,
      'GB': 2.00,
      '_Europe': 2.00,
      'IE': 2.20,
      'DK': 2.20,
      'AE': 1.80,
      'QA': 1.80,
      'KW': 1.80,
      'SA': 1.80,
    },
  },
  {
    range: [201, 300],
    price_per_item: true,
    price: {
      'UzS-fedex': 2.10,
      'UzS-ups': 2.15,
      'TH': 0.78,
      'SG': 0.60,
      'HK': 0.60,
      'MY': 1.00,
      'CN': 1.20,
      'IN': 1.40,
      'CA': 1.80,
      'MX': 1.80,
      'AU': 2.00,
      'PH': 1.20,
      'ID': 0.80,
      'MO': 1.00,
      'JP': 1.20,
      'KR': 1.00,
      'GB': 1.80,
      '_Europe': 1.80,
      'IE': 2.20,
      'DK': 2.20,
      'AE': 1.80,
      'QA': 1.80,
      'KW': 1.80,
      'SA': 1.80,
    },
  },
  {
    range: [301, 400],
    price_per_item: true,
    price: {
      'UzS-fedex': 2.00,
      'UzS-ups': 2.10,
      'TH': 0.66,
      'SG': 0.40,
      'HK': 0.40,
      'MY': 1.00,
      'CN': 1.20,
      'IN': 1.20,
      'CA': 1.80,
      'MX': 1.80,
      'AU': 1.80,
      'PH': 1.00,
      'ID': 0.80,
      'MO': 0.80,
      'JP': 1.00,
      'KR': 0.80,
      'GB': 1.60,
      '_Europe': 1.60,
      'IE': 2.00,
      'DK': 2.00,
      'AE': 1.80,
      'QA': 1.80,
      'KW': 1.80,
      'SA': 1.80,
    },
  },
  {
    range: [401, 500],
    price_per_item: true,
    price: {
      'UzS-fedex': 1.95,
      'UzS-ups': 2.05,
      'TH': 0.64,
      'SG': 0.40,
      'HK': 0.40,
      'MY': 1.00,
      'CN': 1.20,
      'IN': 1.20,
      'CA': 1.70,
      'MX': 1.70,
      'AU': 1.80,
      'PH': 1.00,
      'ID': 0.80,
      'MO': 0.60,
      'JP': 0.80,
      'KR': 0.80,
      'GB': 1.60,
      '_Europe': 1.60,
      'IE': 2.00,
      'DK': 2.00,
      'AE': 1.80,
      'QA': 1.80,
      'KW': 1.80,
      'SA': 1.80,
    },
  },
  {
    range: [501, 700],
    price_per_item: true,
    price: {
      'UzS-fedex': 1.90,
      'UzS-ups': 2.00,
      'TH': 0.64,
      'SG': 0.40,
      'HK': 0.40,
      'MY': 1.00,
      'CN': 1.20,
      'IN': 1.20,
      'CA': 1.70,
      'MX': 1.70,
      'AU': 1.80,
      'PH': 1.00,
      'ID': 0.80,
      'MO': 0.60,
      'JP': 0.80,
      'KR': 0.80,
      'GB': 1.60,
      '_Europe': 1.60,
      'IE': 2.00,
      'DK': 2.00,
      'AE': 1.80,
      'QA': 1.80,
      'KW': 1.80,
      'SA': 1.80,
    },
  },
  {
    range: [701, 1000],
    price_per_item: true,
    price: {
      'UzS-fedex': 1.85,
      'UzS-ups': 1.95,
      'TH': 0.64,
      'SG': 0.40,
      'HK': 0.40,
      'MY': 1.00,
      'CN': 1.00,
      'IN': 1.20,
      'CA': 1.70,
      'MX': 1.70,
      'AU': 1.80,
      'PH': 1.00,
      'ID': 0.80,
      'MO': 0.60,
      'JP': 0.80,
      'KR': 0.80,
      'GB': 1.60,
      '_Europe': 1.60,
      'IE': 1.80,
      'DK': 1.80,
      'AE': 1.80,
      'QA': 1.80,
      'KW': 1.80,
      'SA': 1.80,
    },
  },
  {
    range: [1001, 1500],
    price_per_item: true,
    price: {
      'UzS-fedex': 1.80,
      'UzS-ups': 1.90,
      'TH': 0.58,
      'SG': 0.40,
      'HK': 0.40,
      'MY': 0.80,
      'CN': 1.00,
      'IN': 1.20,
      'CA': 1.70,
      'MX': 1.70,
      'AU': 1.60,
      'PH': 1.00,
      'ID': 0.60,
      'MO': 0.60,
      'JP': 0.80,
      'KR': 0.80,
      'GB': 1.60,
      '_Europe': 1.60,
      'IE': 1.80,
      'DK': 1.80,
      'AE': 1.60,
      'QA': 1.60,
      'KW': 1.60,
      'SA': 1.60,
    },
  },
  {
    range: [1501, 2500],
    price_per_item: true,
    price: {
      'UzS-fedex': 1.75,
      'UzS-ups': 1.85,
      'TH': 0.58,
      'SG': 0.40,
      'HK': 0.40,
      'MY': 0.80,
      'CN': 1.00,
      'IN': 1.20,
      'CA': 1.70,
      'MX': 1.70,
      'AU': 1.60,
      'PH': 1.00,
      'ID': 0.60,
      'MO': 0.60,
      'JP': 0.80,
      'KR': 0.80,
      'GB': 1.60,
      '_Europe': 1.60,
      'IE': 1.80,
      'DK': 1.80,
      'AE': 1.60,
      'QA': 1.60,
      'KW': 1.60,
      'SA': 1.60,
    },
  },
  {
    range: [2501, null], // Sử dụng null cho không có giới hạn trên (2501++)
    price_per_item: true,
    price: {
      'UzS-fedex': 1.73,
      'UzS-ups': 1.80,
      'TH': 0.58,
      'SG': 0.40,
      'HK': 0.40,
      'MY': 0.80,
      'CN': 0.80,
      'IN': 1.20,
      'CA': 1.70,
      'MX': 1.70,
      'AU': 1.60,
      'PH': 1.00,
      'ID': 0.60,
      'MO': 0.60,
      'JP': 0.80,
      'KR': 0.80,
      'GB': 1.60,
      '_Europe': 1.60,
      'IE': 1.80,
      'DK': 1.80,
      'AE': 1.60,
      'QA': 1.60,
      'KW': 1.60,
      'SA': 1.60,
    },
  },
];

const shippingZones = [];

for (const { options } of x) {
  for (const element of options) {
    shippingZones.push({
      id: uuidv4(),
      name: 'Standard',
      additional_shipping_fee: 9.75,
      rates: y.map((item) => {
        let priceKeys = Object.keys(item.price)
          .filter((key) => {
            if (key.startsWith("_")) {
              const region = key.replace("_", "");
              return x.find(({ title }) => title === region).options
                .map((item) => item.value)
                .includes(element.value);
            }
            return key.includes(element.value);
          })

        if (priceKeys.length === 0) {
          priceKeys = ['IE']
        }

        if (priceKeys.length > 1) {
          priceKeys = priceKeys.filter((key) => !key.startsWith("_"));
        }

        if (priceKeys.length > 1) {
          console.warn(`Multiple price keys found for ${element.value}: ${priceKeys.join(', ')}`);
        }

        return {
          from: item.range[0],
          to: item.range[1] === null ? undefined : item.range[1],
          pricing_mode: item.price_per_item ? 'per_unit' : 'flat',
          price: item.price[priceKeys[0]]
        };
      }),
      country: element.value,
    });
  }
}

[['UzS-fedex','FedEx Standard'],['UzS-ups','UPS Standard']].forEach(([value, name]) => {
  const correctValue = value.replace('UzS-', 'US-');

  shippingZones.push({
    id: uuidv4(),
    name: name,
    additional_shipping_fee: 9.75,
    rates: y.map((item) => {
      let priceKeys = Object.keys(item.price)
        .filter((key) => {
          if (key.startsWith("_")) {
            const region = key.replace("_", "");
            return x.find(({ title }) => title === region).options
              .map((item) => item.value)
              .includes(correctValue);
          }
          return key.includes(correctValue);
        })
  
      if (priceKeys.length === 0) {
        priceKeys = ['IE']
      }
  
      if (priceKeys.length > 1) {
        priceKeys = priceKeys.filter((key) => !key.startsWith("_"));
      }
  
      if (priceKeys.length > 1) {
        console.warn(`Multiple price keys found for ${correctValue}: ${priceKeys.join(', ')}`);
      }
  
      return {
        from: item.range[0],
        to: item.range[1] === null ? undefined : item.range[1],
        pricing_mode: item.price_per_item ? 'per_unit' : 'flat',
        price: item.price[priceKeys[0]]
      };
    }),
    country: 'US',
  });
})

fs.writeFileSync('shippingZones.json', JSON.stringify(shippingZones, null, 2), 'utf-8');