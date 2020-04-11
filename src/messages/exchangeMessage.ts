import { Message } from '@line/bot-sdk';
import { trimWhiteSpace } from '../utils/trimWhiteSpace';

const pool: Record<string, number> = {
  百年銀杏: 150,
  荷花池塘: 150,
  竹林花園: 150,
  玩具攤: 20,
  早餐攤: 20,
  算掛攤: 20
};

const getValue = (name: string): number | undefined => {
  return pool[name] ? pool[name] : /牌坊$/.test(name) ? 15 : undefined;
};

const objects = Object.keys(pool);

const values: Record<string, number> = {
  告示板: 1,
  樹: 2,
  應天農田: 5
};

export function exchangeMessage(name: string): Message {
  const value = getValue(name);
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
      ${objects.join(' / ')} / 各種牌坊 
      歡迎提供數據, 但要已 告示板 / 樹 / 應天農田的數量為主`)
  };
}
