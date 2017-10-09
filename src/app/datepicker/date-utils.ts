import * as moment from 'moment';

export const FROM_FORMAT = 'YYYY-MM-DD';
export const TO_FORMAT = 'DD/MM/YYYY';

export class DateUtils {

  private static locale = moment().locale('pt-br');

  static format(value, fromFormat: string = FROM_FORMAT, toFormat: string = TO_FORMAT) {
    const formater = moment(value, fromFormat);

    formater.utcOffset(0);

    if (formater.isValid()) {
      return formater.format(toFormat);
    }

    return '';
  }

  static getMonthName(month: number) {
    return this.locale.localeData().months(moment([0, month-1]));
  }
}
