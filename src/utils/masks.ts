import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: string) {
  const dateFormatted = format(new Date(date), 'dd MMM y', {
    locale: ptBR,
  });

  return dateFormatted;
}
