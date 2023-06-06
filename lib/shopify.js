

import Client from "shopify-buy";
const STOREFRONT_API_TOKEN = '71b43a0d274ed3e5c9f3962a62c0f455';
const ENDPOINT = 'ffc93f.myshopify.com';
export const shopifyClient = Client.buildClient({
  storefrontAccessToken: STOREFRONT_API_TOKEN,
  domain: ENDPOINT,
});


export const parseShopifyResponse = (response) =>  JSON.parse(JSON.stringify(response));

