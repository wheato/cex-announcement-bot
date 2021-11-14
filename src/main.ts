import cex from './cex';
import { push } from './subs';

const TIME_INTERVAL = 30 * 1000;

const repeatCheck = (cex: string, func: () => Promise<unknown[] | null>) => {
  setTimeout(async () => {
    const newList = await func();
    if (newList && newList.length > 0) {
      newList.forEach(async (item: NewListToken) => {
        await push({
          cex,
          title: item.title,
          link: '',
          token: item.name,
          symbol: item.token,
          timestamp: Date.now(),
        })
      })
    } else {
      console.log('未发现新的上币信息', Date.now())
    }
    repeatCheck(cex, func);
  }, TIME_INTERVAL);
}

const runTask = async function (item: CexConfItem) {
  try {
    await item.methods.init();
    repeatCheck(`${item.cn_name}(${item.name})`, item.methods.check);
  } catch (err) {
    console.log(err);
  }
}
// init
cex.forEach(runTask)
