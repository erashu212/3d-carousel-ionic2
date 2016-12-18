import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { NavController, NavParams } from'ionic-angular';

import { PagerComponent } from '../../shared/pager';
import { ProfileComponent } from '../../shared/profile';

import { QuestionDetailsComponent } from './question-details';
import { QuestionService, IQuestion } from './shared';

import { LoginComponent } from '../login';
import { ProducerComponent } from '../producer';
import { FeedbackComponent } from '../feedback'

@Component({
  selector: 'questions',
  templateUrl: 'build/pages/question/question.component.html',
  directives: [ QuestionDetailsComponent, PagerComponent, ProfileComponent ],
  providers: [ QuestionService ]
})
export class QuestionsComponent {
  pageCounter: number = 0;
  questions: IQuestion[];
  slicedQuestions: IQuestion[] = [];
  itemPerPage: number = 1;
  currentPage: number = 1;
  totalItems: number;
  progressBarValue: number = 10;
  selectedProducer: any;

  constructor(
    private questionService: QuestionService,
    private navController: NavController,
    private navParams: NavParams
  ) {
    this.selectedProducer = this.navParams.get('producer')
   }

  ngOnInit() {
    this.questions = this.questionService.getQuestions();
    this.totalItems = this.questions.length;
    this.onPageChange(0);
    this.progressBarValue = 10;
  }

  onAnswerSelection(data: IQuestion) {
    // setting up answer value to question object.
    this.questions.filter((item) => item.id == data.id)
      .map(item => item.answer = data.answer);
    
    this.questionService.setAnswerForQuestion(data).then(res => {
      this.pageCounter++;

      if (this.currentPage === this.questions.length - 1) {
        this.loadQuestionSummaryWindow();
      }
      this.onPageChange(this.pageCounter * this.itemPerPage);
    });
  }

  onPageChange(page) {
    this.currentPage = page;
    this.slicedQuestions = this.questions.slice(this.currentPage, this.currentPage + this.itemPerPage);
    this.calculateProgressBarValue();
  }

  private loadQuestionSummaryWindow() {
    this.questionService.getAnswers().then(res => {
      this.navController.setRoot(FeedbackComponent);
    });
  }

  private gotoPreviousScreen() {
    this.navController.setRoot(ProducerComponent);
  }

  private gotoLogin() {
    this.navController.setRoot(LoginComponent);
  }

  private calculateProgressBarValue() { 
    let length = this.questions.length;
    if (length > 0) {
      this.progressBarValue = this.progressBarValue +  Math.round(80 / length);
    }  
  }
}