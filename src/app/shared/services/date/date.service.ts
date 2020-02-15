import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DateService {
  SPLITTER = ':';
  constructor() { }

  getNow(): Date {
    return new Date();
  }

  getMs(time: string): number {
    return +(new Date(`Thu, 01 Jan 1970 ${time}:00 GMT`));
  }

  addOffset(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60 * 1000);
  }

  getStringTime(date: Date) {
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${this._pad(hour)}${this.SPLITTER}${this._pad(min)}`;
  }

  _pad(number): string {
    return ("0" + number).slice(-2);
  } 

  getWeekDayDateObj(weekDay: number, time: string): Date {
    const [hour, min] = time.split(this.SPLITTER);
    const date = this._getDateObjByWeekDay(weekDay);
    date.setHours(+hour, +min, 0, 0);
    return date;
  }

  // by default in js 0 = sunday
  getToday(): number {
    return this.getWeekDay(new Date());
  }
  getWeekDay(date: Date): number {
    let day = date.getDay();
    return (0 === day) ? 6 : --day;
  }
  // @Tested
  getCorrectWeekDayNumber(day: number): number {
    return day >= 7 ? day - 7 : day;
  }

  getHours(time: string): number {
    return (new Date(this.getMs(time))).getUTCHours();
  }

  getMinutes(time: string): number {
    return (new Date(this.getMs(time))).getMinutes();
  }
  // Get Date() by week day number, from now to future
  _getDateObjByWeekDay(weekDay: number): Date {
    const date = new Date();
    const today = this.getToday();
    const offset = this._getDayOffsetFromTodayOnWeek(weekDay, today);

    if (0 === offset) {
      return date;
    }

    date.setDate(date.getDate() + offset);

    return date;
  }
  // Offset (distance) always in future
  // @tested
  _getDayOffsetFromTodayOnWeek(weekDay: number, today: number): number {
    // weekDay = 6, today = 5 or less
    if (weekDay > today) {
      return weekDay - today;
    }

    // today = 6, weekDay = 5 or less
    if (today > weekDay) {
      return 6 - today + weekDay + 1;
    }

    return 0;
  }

  getDayLabel(day: number): string {
    const date = this._getDateObjByWeekDay(day);
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }
}
