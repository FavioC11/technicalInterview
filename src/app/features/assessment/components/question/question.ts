import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question as QuestionModel } from '../../../../core/models/question.model';
import { CodeEditor } from '../../../../shared/components/code-editor/code-editor';

@Component({
  selector: 'app-question',
  imports: [CommonModule, FormsModule, CodeEditor],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question {
  question = input.required<QuestionModel>();
  answer = input<string>('');
  isAnswered = input<boolean>(false);

  answerChange = output<{ questionId: number; answer: string }>();

  showCriteria = signal(false);
  localAnswer = signal('');

  ngOnInit() {
    this.localAnswer.set(this.answer());
  }

  toggleCriteria() {
    this.showCriteria.update((value) => !value);
  }

  onAnswerInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.localAnswer.set(target.value);
    this.answerChange.emit({
      questionId: this.question().id,
      answer: target.value,
    });
  }

  onCodeEditorChange(code: string) {
    this.localAnswer.set(code);
    this.answerChange.emit({
      questionId: this.question().id,
      answer: code,
    });
  }

  getLevelClass(): string {
    const level = this.question().level;
    const classMap: Record<string, string> = {
      JUNIOR: 'level-junior',
      'SEMI SENIOR': 'level-semi-senior',
      SENIOR: 'level-senior',
      EXPERT: 'level-expert',
    };
    return classMap[level] || 'level-junior';
  }
}
