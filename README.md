# stripe tax utilities

Returns Stripe type for supplied tax id and country



### Install

```
npm i stripe-tax-utils
```

### Usage

```js
import stripeTaxUtils from 'stripe-tax-utils';

// get stripe type
const type = stripeTaxUtils.getStripeType({ country: 'GB', taxId: 'GB123456789' });
const type2 = stripeTaxUtils.getStripeType({ country: 'gb', taxId: 'XI123456789' });

console.log(type); // gb_vat
console.log(type2); // eu_vat

// return whole array of tax items with regex to test yourself
const map = stripeTaxUtils.getMap();

// get one type
const typeObj = stripeTaxUtils.getTaxItem({ country: 'GB', taxId: 'GB123456789' });

console.log(typeObj);
// {
//   country: 'GB',
//   type: 'gb_vat',
//   description: 'United Kingdom VAT number',
//   regex: /^GB[0-9]{9}$/,
//   example: 'GB123456789'
// }
```

### Licence MIT

