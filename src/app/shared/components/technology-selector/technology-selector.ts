import { Component, computed, inject } from '@angular/core';
import { Technology, TechnologyCategory } from '../../../core/models/technology.model';
import { AssessmentService } from '../../../core/services/assessment.service';

@Component({
  selector: 'app-technology-selector',
  standalone: true,
  template: `
    <div class="technology-selector">
      <h2 class="selector-title">Selecciona la Tecnología a Evaluar</h2>

      @for (category of categories; track category) {
        <div class="category-section">
          <h3 class="category-title">{{ category }}</h3>
          <div class="technology-grid">
            @for (tech of getTechnologiesByCategory(category); track tech.id) {
              <button
                class="technology-card"
                [class.selected]="selectedTech()?.id === tech.id"
                (click)="selectTechnology(tech)"
                [style.border-color]="tech.color"
              >
                <div class="tech-icon">{{ tech.icon }}</div>
                <div class="tech-name">{{ tech.name }}</div>
                <div class="tech-description">{{ tech.description }}</div>
                <div class="tech-levels">
                  @for (level of tech.levels; track level) {
                    <span class="level-badge">{{ level }}</span>
                  }
                </div>
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .technology-selector {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .selector-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 3rem;
      color: #333;
    }

    .category-section {
      margin-bottom: 3rem;
    }

    .category-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: #555;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e0e0e0;
    }

    .technology-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .technology-card {
      background: white;
      border: 3px solid #e0e0e0;
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      position: relative;
    }

    .technology-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .technology-card.selected {
      border-width: 4px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .tech-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .tech-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .tech-description {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
      min-height: 40px;
    }

    .tech-levels {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }

    .level-badge {
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      color: #666;
    }

    @media (max-width: 768px) {
      .technology-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TechnologySelectorComponent {
  private assessmentService = inject(AssessmentService);

  technologies = this.assessmentService.getAllTechnologies();
  selectedTech = computed(() => this.assessmentService.getSelectedTechnology());

  categories = Object.values(TechnologyCategory);

  getTechnologiesByCategory(category: TechnologyCategory): Technology[] {
    return this.technologies.filter(t => t.category === category);
  }

  selectTechnology(tech: Technology): void {
    this.assessmentService.setTechnology(tech.id);
  }
}
