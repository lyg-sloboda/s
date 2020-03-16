import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'sch-carousel-slide',
  templateUrl: './carousel-slide.component.html',
})
export class CarouselSlideComponent implements OnInit {
  @Input() timer: number;
  // For component https://stackoverflow.com/questions/41880420/how-to-get-templateref-of-a-component-in-angular2
  // For directive https://stackoverflow.com/questions/49287859/rendering-the-components-in-contentchildren-of-angular
  @ViewChild('template', { static: true, read: TemplateRef }) public template: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }
}
