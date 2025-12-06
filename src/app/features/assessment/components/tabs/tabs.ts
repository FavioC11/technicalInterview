import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../../../core/models/question.model';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  sections = input.required<Section[]>();
  activeSection = input.required<string>();

  sectionChange = output<string>();

  onTabClick(sectionId: string) {
    this.sectionChange.emit(sectionId);
  }
}
