import type {
  IAccessAuth,
  IAnalyticsItem,
  IHistoryResponse,
  IRefreshToken,
  ITokensUser,
  ITokenUser,
  IUser,
} from './types';

const UrlToken = 'https://exbo.net/oauth/token';

const SCMarketServer = 'http://localhost:3000';

export const getUserTokens = async ({ code }: ITokensUser): Promise<ITokenUser> => {
  const response = await fetch(`${SCMarketServer}/users/getTokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: code }),
  });

  return await response.json();
};

export const refreshToken = async (data: IRefreshToken): Promise<IAccessAuth> => {
  const response = await fetch(UrlToken, {
    method: 'POST',
    headers: {},
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const getUserDataAsync = async (data: ITokenUser): Promise<IUser> => {
  const response = await fetch(`${SCMarketServer}/users/getUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ access_token: data.access_token, refresh_token: data.refresh_token }),
  });

  console.log('async job api');

  return await response.json();
};
//Получение всех объектов
// export async function getItems() {
//   const response = await fetch(urlItems, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     }
//   });
//   return response;
// }

export const getAnalyticsItem = async (item: string): Promise<IAnalyticsItem> => {
  console.log('Analytics item: ' + item);
  const response = await fetch(`${SCMarketServer}/analytics/getAnalyticsItems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemid: item }),
  });

  const data = await response.json();

  return {
    buy_price_min: data.buy.min,
    buy_price_max: data.buy.max,
    sell_price_min: data.sell.min,
    sell_price_max: data.sell.max,
    countItem: data.countItem,
  };
};

export const getHistoryItem = async (item: string): Promise<IHistoryResponse> => {
  console.log('Loading SC:Api history item: ' + item);
  const response = await fetch(`${SCMarketServer}/analytics/getAnalyticsHistoryItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemid: item }),
  });

  return await response.json();
};
