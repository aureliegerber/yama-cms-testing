import { format } from "date-fns";

export const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy');

export const nl2br = (text) => text.replaceAll('\r\n', '<br />');
