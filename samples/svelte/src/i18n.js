import fetch from 'cross-fetch';
import config from './temp/config';

export default function i18nInit(language, dictionary) {
  if (dictionary) {
    return Promise.resolve({
      lang: language,
      phrases: dictionary
    })
  } else {
    const dictionaryServicePath = `${config.sitecoreApiHost}/sitecore/api/jss/dictionary/${config.jssAppName}/${language}?sc_apikey=${config.sitecoreApiKey}`;

    return fetch(dictionaryServicePath)
      .then(response => response.json());
  }
}