import { Component, Input, OnInit } from '@angular/core';

// This component is used to display the progress bar
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass']
})
// This component is used to display the progress bar
export class ProgressBarComponent implements OnInit {
  @Input() color = 'bug';
  @Input() value = 0;
  @Input() height = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
