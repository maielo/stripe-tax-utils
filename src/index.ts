import stripeTaxMap from './stripeTaxMap';

export type TaxIdItem = {
  country: string;
  type:
    | 'ae_trn'
    | 'au_abn'
    | 'au_arn'
    | 'br_cnpj'
    | 'br_cpf'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'ch_vat'
    | 'cl_tin'
    | 'es_cif'
    | 'eu_vat'
    | 'gb_vat'
    | 'hk_br'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'jp_cn'
    | 'jp_rn'
    | 'kr_brn'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'no_vat'
    | 'nz_gst'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'th_vat'
    | 'tw_vat'
    | 'us_ein'
    | 'za_vat'
    | 'unknown';
  example: string;
  description: string;
  regex: RegExp;
};

export default {
  getMap() {
    return stripeTaxMap;
  },
  getStripeType: function ({
    country,
    taxId,
  }: {
    country: string;
    taxId: string | number;
  }): TaxIdItem['type'] | null {
    if (!country || !taxId) {
      throw new Error('country and taxId are required');
    }

    const item = this.getTaxItem({ country, taxId });

    if (item) {
      return item.type;
    }

    return null;
  },
  getTaxItem({
    country,
    taxId,
  }: {
    country: string;
    taxId: string | number;
  }): TaxIdItem | null {
    if (!country || !taxId) {
      throw new Error('country and taxId are required');
    }

    // first search by country (one country can have multiple taxIds)
    const dataList = stripeTaxMap.filter(
      ({ country: c }) => c?.toLowerCase() === country.toLowerCase()
    );

    if (dataList.length >= 1) {
      const t = dataList.filter((item) => {
        if (new RegExp(item.regex, 'i').test(`${taxId}`)) {
          return item;
        }

        return false;
      });

      if (t.length === 1) {
        return t[0];
      }

      return null;
    }

    // if country is not found, search by taxId
    return null;
  },
};
