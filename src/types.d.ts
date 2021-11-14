
interface PushMessage {
  cex: string;
  title: string;
  link: string;
  token: string;
  symbol: string;
  timestamp: number;
}

interface NewListToken {
  token: string;
  name: string,
  title: string,
}
interface CexConfItem {
  cn_name: string;
  name: string;
  methods: {
    init: () => Promise<void>,
    check: () => Promise<unknown[] | null>,
  }
}
