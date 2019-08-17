import fetch from 'cross-fetch';
import config from './temp/config';

export default function i18nInit(language, dictionary) {
  return new Promise((resolve) => {
    if (dictionary) {
      resolve({
        lang: language,
        phrases: dictionary
      })
    } else {
      // eslint-disable-next-line prettier/prettier
      const dictionaryServicePath = `${config.sitecoreApiHost}/sitecore/api/jss/dictionary/${config.jssAppName}/${config.defaultLanguage}?sc_apikey=${config.sitecoreApiKey}`;

      fetch(dictionaryServicePath)
        .then(response => response.json())
        .then(json => {
          resolve(json);
        });
    }
  });
}