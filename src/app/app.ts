import { Component } from '@angular/core';
import { Assessment } from './features/assessment/assessment';

@Component({
  selector: 'app-root',
  imports: [Assessment],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
