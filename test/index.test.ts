import stripeTax from '../src/index';

describe('stripe tax utils', () => {
  it('There should be no duplicate items', () => {
    const items = stripeTax.getMap();
    for (const item of items) {
      const found = items.filter(
        (x) =>
          x.country === item.country &&
          x.regex.toString() === item.regex.toString()
      );
      try {
        expect(found.length).toBe(1);
      } catch (error) {
        console.log(found);
        throw error;
      }
    }
  });

  it('Should return correct stripe type for manually defined tax id and country', () => {
    const type = stripeTax.getStripeType({
      country: 'GB',
      taxId: 'GB123456789',
    });
    const type2 = stripeTax.getStripeType({
      country: 'GB',
      taxId: 'XI123456789',
    });

    expect(type).toBe('gb_vat');
    expect(type2).toBe('eu_vat');
  });

  it('It should return correct type if the country is lower cased', () => {
    const type = stripeTax.getStripeType({
      country: 'cl',
      taxId: '12.345.678-K',
    });
    expect(type).toBe('cl_tin');
  });

  it('Should check all map items against their regexps', () => {
    const map = stripeTax.getMap();

    map.forEach((x) => {
      expect(new RegExp(x.regex).test(x.example)).toBe(true);
    });
  });

  it('Should return tax object', () => {
    const type = stripeTax.getTaxItem({ country: 'GB', taxId: 'GB123456789' });
    expect(type).toEqual({
      country: 'GB',
      type: 'gb_vat',
      description: 'United Kingdom VAT number',
      regex: /^GB[0-9]{9}$/,
      example: 'GB123456789',
    });
  });

  it('Should return null if not found', () => {
    const type = stripeTax.getTaxItem({ country: 'GB', taxId: 'asdasdasd' });
    expect(type).toBe(null);
  });

  it('Should return null if not valid country supplied', () => {
    const type = stripeTax.getTaxItem({ country: 'xxx', taxId: 'GB123456789' });
    expect(type).toBe(null);
  });
});
