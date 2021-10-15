
export type taxIdItem = {
  country: string;
  enum: "ae_trn"| "au_abn"| "au_arn"| "br_cnpj"| "br_cpf"| "ca_bn"| "ca_gst_hst"| "ca_pst_bc"| "ca_pst_mb"| "ca_pst_sk"| "ca_qst"| "ch_vat"| "cl_tin"| "es_cif"| "eu_vat"| "gb_vat"| "hk_br"| "id_npwp"| "il_vat"| "in_gst"| "jp_cn"| "jp_rn"| "kr_brn"| "li_uid"| "mx_rfc"| "my_frp"| "my_itn"| "my_sst"| "no_vat"| "nz_gst"| "ru_inn"| "ru_kpp"| "sa_vat"| "sg_gst"| "sg_uen"| "th_vat"| "tw_vat"| "us_ein" | "za_vat" | unknown
  description: string;
  example: string;
  testRe: RegExp;
}

export default [
  {
    country:
  }
];

