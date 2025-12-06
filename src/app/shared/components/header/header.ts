import { Component, input } from '@angular/core';
import { Technology } from '../../../core/models/technology.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  technology = input<Technology | null>(null);
}
