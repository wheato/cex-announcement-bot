import axios from "axios";

const webhooks = [
  'https://discord.com/api/webhooks/909393305631088670/vEcnNfCqterYT5s8P0vHJqfB3Od4nmuJIxM4WY3_H1KGhJPEK67h7g2VgGj2fioO5CGz',
]

export const sendMsgToDiscord = (msg: string) => {
  webhooks.forEach(async wh => {
    try {
      await axios.post(wh, {
        content: msg
      })
      console.log('推送 Discord 成功');
    } catch (err) {
      console.log(err);
      console.log('推送 Discord 失败');
    }
  })
}
