import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  percentage = input<number>(0);
  answeredCount = input<number>(0);
  totalQuestions = input<number>(0);
}
