import { DateService } from '../date/date.service';
import { RouteRules } from '../route-rules/route-rules.service';

export interface IDefaultRoute {
    label: string;
    number: string | number;
    days: Array<number>;
    departureTime: string;
    arrivalTime: string;
    url?: string;
    type: string;
}

export interface IRoute {
    label: string;
    number: string;
    weekDay: number;
    days: Array<number>;
    departureTime: string;
    departureDate: Date;
    arrivalTime: string;
    arrivalDate: Date;
    url: string;
    type: string;
}

// export class ScheduleRoutes {
//     constructor(private route: IDefaultRoute, private date: DateService) {

//     }

//     // clone(obj) {
//     //     return Object.create(
//     //         Object.getPrototypeOf(obj),
//     //         Object.getOwnPropertyDescriptors(obj)
//     //     );
//     // }

//     getRoutesByDay() {
//         let days = [];
//         this.route.days.forEach((day) => {
//             days[day] = new ScheduleRoute(Object.assign({}, this.route), day, this.date);
//         });

//         return days;
//     }
// }

export class ScheduleRoute implements IRoute {
    label: string;
    number: string;
    weekDay: number;
    days: Array<number>;

    departureTime: string;
    departureDate: Date;

    arrivalTime: string;
    arrivalDate: Date;

    url: string;

    type: string;

    constructor(
        route: IDefaultRoute,
        weekDay: number,
        private date: DateService,
        private rules: RouteRules
    ) {
        const _route = Object.assign({}, route);
        for (const key in _route) {
            this[key] = _route[key];
        }
        this.weekDay = weekDay;
        this.departureDate = this.date.getWeekDayDateObj(weekDay, this.departureTime);
        this.arrivalDate = this.date.getWeekDayDateObj(weekDay, this.arrivalTime);

        if (this.rules.offsetFrom) {
            this.departureDate = this.date.addOffset(this.departureDate, this.rules.offsetFrom);
            this.departureTime = this.date.getStringTime(this.departureDate);
        }

        if (this.rules.offsetTo) {
            this.arrivalDate = this.date.addOffset(this.arrivalDate, -this.rules.offsetTo);
            this.arrivalTime = this.date.getStringTime(this.arrivalDate);
        }
    }

    isActiveNow(time?: number): boolean {
        if (!time) {
            time = (new Date()).getTime();
        }
        return this.departureDate.getTime() >= time;
    }
}
