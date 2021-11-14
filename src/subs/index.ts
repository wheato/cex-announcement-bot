import * as dayjs from 'dayjs';
import { sendMsgToDiscord } from './discord';

export const push = async (msg: PushMessage) => {
  const text = `----------- ${msg.cex}上新 -----------
  交易所：${msg.cex}
  名称：${msg.token}
  代币：${msg.symbol}
  时间：${dayjs(msg.timestamp).format('YYYY-MM-DD HH:mm:ss')}
  `;

  // 推送消息到 Discord
  sendMsgToDiscord(text);

  // 推送消息到 Telegram
}
