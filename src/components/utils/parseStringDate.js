import { parse as dateFnsParse, isDate } from 'date-fns'
import today from './today'

export default (str, format = 'd-M-yyyy', locale) => {
  const parsed = dateFnsParse(str, format, today, { locale })
  if (isDate(parsed)) {
    return parsed
  }
  return undefined
}
