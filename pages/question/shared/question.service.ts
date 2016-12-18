import { Injectable } from '@angular/core';

import { Storage, LocalStorage } from 'ionic-angular';

import { QUESTIONS } from './question.mock';
import * as schema from './question.schema';

@Injectable()
export class QuestionService {

  private storage: Storage;

  constructor() {
    this.storage = new Storage(LocalStorage);
    this.storage.remove('question');
  }

  getQuestions() {
    return QUESTIONS;
  }

  getAnswers() {
    return this.storage.getJson('question');
  }

  setAnswerForQuestion(question: schema.IQuestion) {
    return new Promise((resolve, reject) => {
      let questions = [];
      this.storage.getJson('question').then((res) => {
        if (res) questions = res;

        let index = questions.findIndex((ques) => ques.id == question.id);
        if (index >= 0) {
          questions[ index ] = question;
        } else { 
          questions.push(question);
        }

        this.storage.setJson('question', questions).then((res) => resolve(res), (errResp) => reject(errResp));
      });
    })
  }
}