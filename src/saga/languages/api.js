import { _language } from '../../_mock/_language';

export const fetchLanguage = ({ languageId }) => {
  console.log('languageRequest', 'id -', languageId);
  return {
    data: {
      collection: _language,
      current: languageId ? _language.find((element) => element.id === languageId) : _language[0],
    },
  };
};
