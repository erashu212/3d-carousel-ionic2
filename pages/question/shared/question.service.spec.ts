import { beforeEachProviders, it, xit, describe, expect, inject } from '@angular/core/testing';

import { HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { provide } from '@angular/core';

import { Storage, LocalStorage } from 'ionic-angular';

import { QUESTIONS } from './question.mock';
import { IQuestion } from './question.schema';
import { QuestionService } from './question.service'

describe('Service: QuestionService', () => {
  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    provide(XHRBackend, { useClass: MockBackend }),
    QuestionService,
  ]);

  it('should get all questions', inject([ QuestionService ], (quesService) => {
    expect(quesService.getQuestions().length).toBe(QUESTIONS.length)
  }));

  it('should set answer for question', inject([ QuestionService ], (quesService) => {
    let questions: Array<IQuestion> = quesService.getQuestions();
    expect(questions.length).not.toBe(0);

    let quest = questions[ 0 ];
    quest.answer = 4;

    quesService.setAnswerForQuestion(quest).then((res) => {
      let questions: Array<IQuestion> = quesService.getQuestions();

      expect(questions[ 0 ].answer).toBe(4)
    })
  }));
});
