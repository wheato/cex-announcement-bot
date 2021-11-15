import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { sendMsgToDiscord } from './discord';

dayjs.extend(utc);

export const push = async (msg: PushMessage) => {

  const text = `----------- ${msg.cex}上新 -----------
  交易所：${msg.cex}
  名称：${msg.token}
  代币：${msg.symbol}
  时间：${dayjs.utc(msg.timestamp).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')}
  `;

  // 推送消息到 Discord
  sendMsgToDiscord(text);

  // 推送消息到 Telegram
}
