import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Activity } from 'src/app/Shared/models/activity';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {
  @Output() activityToSeeInDetail = new EventEmitter<Activity>();
  @Input() activityList: Activity[];

  constructor() { }

  ngOnInit(): void {
  }

  onActionClicked(activity: Activity): void {
    this.activityToSeeInDetail.emit(activity);
  }
}
