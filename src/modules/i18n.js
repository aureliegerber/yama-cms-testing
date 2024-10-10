import messages from "@data/messages.json";

export const trans = (key, locale) => messages.find(message => message.key === key)?.translations[locale]?.value;
