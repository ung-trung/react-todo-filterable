import { format as dateFnsFormat } from 'date-fns'

export default (date, format = 'd-M-yyyy', locale) => {
  return dateFnsFormat(date, format, { locale })
}
