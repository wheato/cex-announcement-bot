import * as binanece from "./binance";

export default [
  {
    cn_name: '币安',
    name: 'Binance',
    methods: {
      init: binanece.init,
      check: binanece.check,
    }
  }
] as CexConfItem[];
