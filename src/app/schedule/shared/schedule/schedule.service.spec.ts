import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { DateService } from '../date/date.service';
import { IDefaultRoute } from './schedule-route';

describe('ScheduleService', () => {
	let service: ScheduleService;
	const schedule: Array<IDefaultRoute> = [
		{
			arrivalTime: '01:00',
			days: [0, 1, 2, 3, 4, 5, 6],
			departureTime: '01:00',
			number: '111',
			label: 'Test route 1'
		},
		{
			arrivalTime: '02:00',
			days: [0, 1, 2, 3, 4, 5, 6],
			departureTime: '02:00',
			number: '222',
			label: 'Test route 2'
		},
	];

	beforeEach(() => {
		// TestBed.configureTestingModule({});
		service = new ScheduleService(new DateService());
		service.setSchedule({schedule});
	});

	it('should be created', () => {
		// const service: ScheduleService = TestBed.get(ScheduleService);
		expect(service).toBeTruthy();
	});

	it('should test _getSchedulePeriodByDay if endDay >= startDay', () => {
		const startDay = 0;
		const endDay = 6;

		const period = service._getSchedulePeriodByDay(startDay, endDay);
		expect(period.length).toEqual(7);
	});

	it('should test _getSchedulePeriodByDay if startDay > endDay', () => {
		const startDay = 6;
		const endDay = 1;

		const period = service._getSchedulePeriodByDay(startDay, endDay);
		// 6, 0, 1
		expect(period.length).toEqual(3);
	});

	// it('should test _getDayRoutesFromNow', () => {
	// 	const dayData = service.scheduleByDay[0]

	// 	const period = service._getSchedulePeriodByDay(startDay, endDay);
	// 	// 6, 0, 1
	// 	expect(period.length).toEqual(3);
	// });
});
