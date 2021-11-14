import axios from 'axios';

const TARGET_URL = 'https://www.binance.com/en/support/announcement/c-48?navId=48';

interface ListedTokens {
  [key: string]: {
    title: string;
    name: string;
  }
}

let historyListed = {};

async function requestAndParse() {
  try {
    const { data } = await axios.get(TARGET_URL);
    const html = (data || '') as string;
    const result = html.matchAll(/Binance Will List ([0-9|a-z|A-Z|\s]+) \(([0-9|a-z|A-Z]+)\)/g);
    const listed: ListedTokens = {};
    for (const item of result) {
      const [title, name, token ] = item;
      listed[token] = {
        title,
        name,
      }
    }
    return listed;
  } catch(err) {
    console.log(err);
    return {};
  }
}

export async function init() {
  try {
    const list = await requestAndParse();
    historyListed = { ...list };
  } catch (err) {
    throw new Error('Initliazed Error.')
  }
}

export async function check() {
  try {
    const newList = [];
    const list = await requestAndParse();
    Object.keys(list).forEach(token => {
      if (historyListed[token]) {
        return;
      }
      historyListed[token] = { ...list[token] };
      const { name, title } = list[token];
      newList.push({
        token,
        name,
        title,
      } as NewListToken);
    })
    return newList.length > 0 ? newList : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
