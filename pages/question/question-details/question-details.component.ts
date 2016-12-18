import { Component, Input, Output, EventEmitter } from '@angular/core';

import { RatingComponent } from '../../../shared/rating';

import { IQuestion } from '../shared';

@Component({
  selector: 'question',
  templateUrl: 'build/pages/question/question-details/question-details.component.html',
  directives: [ RatingComponent ]
})
export class QuestionDetailsComponent {
  @Input() question: IQuestion;

  @Output() onAnswerSelection: EventEmitter<IQuestion>
  = new EventEmitter<IQuestion>();

  private defaultQuestion: IQuestion = {
    id: '',
    text: '',
    type: 'Rating',
    answer: 0
  }

  ngOnInit() { 
    this.question = Object.assign({}, this.defaultQuestion, this.question);
  }

  private onSelection(data) {
    this.question.answer = data;
    this.onAnswerSelection.next(this.question);
  }
}