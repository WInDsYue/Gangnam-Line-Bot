import { Message } from '@line/bot-sdk';

export const joinGroup = (): Message => ({
  type: 'text',
  text: `您的攻略好夥伴上線啦\udbc0\udc79`
});
