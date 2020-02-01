import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });

  it('should check _getDayOffsetByWeekday if today > weekDay', () => {
    const service: DateService = TestBed.get(DateService);
    const weekDay = 1;
    const today = 2;

    let offset = service._getDayOffsetFromTodayOnWeek(weekDay, today);
    expect(offset).toEqual(6);
  });

  it('should check _getDayOffsetByWeekday if weekDay > today', () => {
    const service: DateService = TestBed.get(DateService);
    const weekDay = 2;
    const today = 1;

    let offset = service._getDayOffsetFromTodayOnWeek(weekDay, today);
    expect(offset).toEqual(1);
  });

  it('should check getCorrectWeekDayNumber', () => {
    const service: DateService = TestBed.get(DateService);
    const day = 8;
    const expectDay = 1;

    let correctNumber = service.getCorrectWeekDayNumber(day);
    expect(correctNumber).toEqual(expectDay);
  });
});
