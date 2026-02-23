import { en } from "./en";

const dictionaries = {
  en,
};

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: Locale = "en") {
  return dictionaries[locale];
}
