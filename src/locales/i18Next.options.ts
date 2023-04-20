import { InitOptions } from "i18next";
import { enTrans, esTrans, frTrans, enErrors, esErrors, frErrors, enValidation, esValidation, frValidation } from './index';

export const i18Options: InitOptions<object> = {
  supportedLngs: ['en', 'es', 'fr'],
  fallbackLng: 'en',
  debug: true,
  returnEmptyString: false,
  resources: {
    en: {
      translation: enTrans,
      validation: enValidation,
      error: enErrors
    },
    es: {
      translation: esTrans,
      validation: esValidation,
      error: esErrors
    },
    fr: {
      translation: frTrans,
      validation: frValidation,
      error: frErrors
    }
  },
  ns: [
    'translation',
    'validation',
    'error'
  ],
}
