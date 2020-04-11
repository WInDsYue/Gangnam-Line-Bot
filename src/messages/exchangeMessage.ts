import { Message } from '@line/bot-sdk';
import { trimWhiteSpace } from '../utils/trimWhiteSpace';

const pool: Record<string, number> = {
  百年銀杏: 150,
  荷花池塘: 150,
  竹林花園: 150,
  簡陋牌坊: 15,
  大理石牌坊: 15,
  漢白玉牌坊: 15,
  玩具攤: 20,
  早餐攤: 20,
  算掛攤: 20
};

const objects = Object.keys(pool);

const values: Record<string, number> = {
  告示板: 1,
  樹: 2,
  應天農田: 5
};

export function exchangeMessage(name: string): Message {
  const value = pool[name];
  if (value) {
    const result = Object.entries(values)
      .reduce<string[]>((res, [key, v]) => [...res, `${value / v}${key}`], [])
      .join(' / ');

    return {
      type: 'text',
      text: `你可以用 ${result}`
    };
  }

  return {
    type: 'text',
    text: trimWhiteSpace(`
      未有記錄，目前只有以下這些
      ${objects.join(' / ')} 
      歡迎提供數據`)
  };
}
