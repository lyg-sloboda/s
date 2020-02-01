import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteRulesService {
  initialDirections = {
    minsk: [
      {
        parser: 'minsktrans',
        from: 1, // minsk
        to: 501227, // lyg sloboda
      },
      {
        parser: 'minsktrans',
        from: 1, // minsk
        to: 522138,
        offsetTo: 15,
        filterNumbers: [1061]
      },
      // {
      //   parser: 'gpmopt',
      //   from: 14830, // minsk
      //   to: 312, // поворот на смиловичи
      //   offsetTo: 15,
      //   filterNumbers: [667]
      // },
      // {
      //   parser: 'gpmopt',
      //   from: 14830, // minsk
      //   to: 756, // натальевск
      //   offsetTo: 15,
      //   filterNumbers: [577]
      // }
    ],
    sloboda: [
      {
        parser: 'minsktrans',
        from: 501227, // lyg sloboda
        to: 1, // minsk
      },
      {
        parser: 'minsktrans',
        from: 522138,
        to: 1, // minsk
        offsetFrom: 8,
        filterNumbers: [1061]
      },
      // {
      //   parser: 'gpmopt',
      //   from: 312, // поворот на смиловичи
      //   to: 14830, // minsk
      //   offsetTo: 22,
      //   filterNumbers: [667]
      // },
      // {
      //   parser: 'gpmopt',
      //   from: 757, // натальевск
      //   to: 58377, // minsk
      //   offsetTo: 30,
      //   filterNumbers: [577]
      // }
    ]
  }
  directions: any = {};
  constructor() {
    for(let key in this.initialDirections) {
      let direction = this.initialDirections[key];
      direction = direction.map((routeRules) => {
        return new RouteRules(routeRules);
      });
      this.directions[key] = new Direction(key, direction);
    }
  }

  getDirection(key) {
    return this.directions[key];
  }

  // getDirectionApiAtts(key) {
  //   const direction = this.getDirection(key);
  //   let {parser, from, to, filterNumbers} = direction;
  //   return { parser, fromTo: `${from}-${to}`, filterNumbers };
  // }
}

interface IRouteRule {
  from: number;
  to: number;
  offsetFrom: number; // minutes
  offsetTo: number; // minutes
  parser: string; // minsktrans
  filterNumbers: Array<string | number> | null;
}

export class RouteRules implements IRouteRule {
  from: number;
  to: number;
  offsetFrom: number; // minutes
  offsetTo: number; // minutes
  parser: string = 'minsktrans'; // minsktrans
  filterNumbers: Array<string | number>;

  constructor(options: any) {
    for(const key in options) {
      this[key] = options[key];
    }
  }
}

interface IDirection {
  rules: Array<RouteRules>;
  shortcut: string;
}

class Direction implements IDirection {
  constructor(public shortcut: string, public rules: Array<RouteRules>) {}
}

