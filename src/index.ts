import stripeTaxMap from './stripeTaxMap';

export type TaxIdItem = {
  country: string;
  type:
    | 'ae_trn'
    | 'ad_nrt'
    | 'au_abn'
    | 'au_arn'
    | 'ar_cuit'
    | 'br_cnpj'
    | 'br_cpf'
    | 'bg_uic'
    | 'bo_tin'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'cn_tin'
    | 'ch_vat'
    | 'cl_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'do_rcn'
    | 'ec_ruc'
    | 'eg_tin'
    | 'es_cif'
    | 'eu_vat'
    | 'eu_oss_vat'
    | 'gb_vat'
    | 'ge_vat'
    | 'hk_br'
    | 'hu_tin'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'is_vat'
    | 'jp_cn'
    | 'jp_rn'
    | 'jp_trn'
    | 'ke_pin'
    | 'kr_brn'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'no_vat'
    | 'nz_gst'
    | 'pe_ruc'
    | 'ph_tin'
    | 'ro_tin'
    | 'rs_pib'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'si_tin'
    | 'sg_gst'
    | 'sg_uen'
    | 'sv_nit'
    | 'th_vat'
    | 'tr_tin'
    | 'tw_vat'
    | 'ua_vat'
    | 'us_ein'
    | 'uy_ruc'
    | 'vn_tin'
    | 've_rif'
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
