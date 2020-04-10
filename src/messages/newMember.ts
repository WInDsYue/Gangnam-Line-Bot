import { Message } from '@line/bot-sdk';
import { trimWhiteSpace } from '../utils/trimWhiteSpace';

export const newMemberNotice = (displayName: string): Message => ({
  type: 'text',
  text: trimWhiteSpace(`
    \udbc0\udc35新知府大人 ${displayName} 加入！
    \udbc0\udc35一起歡迎他！
    \udbc0\udc35請先加我好友，我有攻略
   
    歡迎您的加入！\udbc0\udc8d
  `)
});
