import { AxiosResponse } from "axios";
import { StrapiEntry, StrapiMeta } from "../api/types";

export const appendBaseUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};

/**
 * This function is same as PHP's nl2br() with default parameters.
 *
 * @param {string} str Input text
 * @param {boolean} replaceMode Use replace instead of insert
 * @param {boolean} isXhtml Use XHTML
 * @return {string} Filtered text
 */
export function nl2br(str: string) {
  let _str = str;
  _str = _str.replace(/(?:\r\n|\r|\n)/g, "<br>");

  return _str;
}

/**
 * Get attributes from strapi single entry response
 */
export const getDataFromResponse = <TResponse>(
  response: AxiosResponse<any, any>
): StrapiEntry<TResponse> => {
  return response.data.data;
};

/**
 * Get entries from strapi entries response
 */
export const getEntriesFromResponse = <TAttributes>(
  response: AxiosResponse<any, any>
): StrapiEntry<TAttributes>[] => {
  return response.data.data;
};

export const getMetaFromResponse = (
  response: AxiosResponse<any, any>
): StrapiMeta => {
  return response.data.meta;
};

export const renderPackingText = (type: "Tea can" | "Tea bag", locale?: String) => {
  let _locale
  switch (type) {
    case "Tea bag":
      return _locale = locale === 'en' ? type : '茶葉包';
    case "Tea can":
      return _locale = locale === 'en' ? type : '茶葉罐';
    default:
      return "";
  }
};

export const getLocale = (locale?: string) => {
  if (!locale) {
    return "en";
  }

  if (locale === "en") {
    return "en";
  }

  if (locale === "zh") {
    return "zh-Hant";
  }

  return "en";
};
