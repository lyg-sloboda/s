import { Component, OnInit, Input } from '@angular/core';
import { NotifierService } from 'src/app/shared/services/notifier/notifier.service';

@Component({
  selector: 'sch-app-introduction',
  templateUrl: './app-introduction.component.html',
  styleUrls: ['./app-introduction.component.scss']
})
export class AppIntroductionComponent implements OnInit {
  @Input() type: string;

  constructor(private notifierService: NotifierService) {
  }

  ngOnInit() {
  }

  closeAppIntro() {
    this.notifierService.checkReadIntroduction();
  }
  closeScheduleIntro() {
    this.notifierService.checkReadAlert();
  }
}
