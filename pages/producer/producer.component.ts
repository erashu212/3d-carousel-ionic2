import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserService } from "../../shared/shared/user/user.service";
import { QuestionsComponent } from "../question";
import { LoginComponent } from "../login";
import { StartComponent } from "../start";
import { CarouselComponent } from "../../shared/carousel/carousel.component"

@Component({
  templateUrl: 'build/pages/producer/producer.component.html',
  directives: [ CarouselComponent ]
})
export class ProducerComponent {

  constructor(private navCtrl: NavController) { }

  private slides = [{
      id: 4,
      description: 'Ashutosh',
      color: '#630460',
      isSelected: false,
      imgUrl: 'https://trello-avatars.s3.amazonaws.com/eba6e9c0ac11915559b815250dc289be/170.png'
    },
    {
      id: 1,
      description: 'Saina',
      color: '#0072bc',
      isSelected: false,
      imgUrl: 'http://resize.indiatvnews.com/en/centered/newbucket/740_520/2016/05/saina-nehwal-1463071838.jpg'
    },
    {
      id: 2,
      description: 'Sakshi',
      color: '#39b54a',
      isSelected: false,
      imgUrl: 'http://static.sportskeeda.com/wp-content/uploads/2016/08/sakshi-malik-poses-with-her-bronze-medal_b2370130-657e-11e6-b7cc-991406f1fe11-1472020701-800.jpg'
    },
    {
      id: 3,
      description: 'Sushil',
      color: '#f26522',
      isSelected: false,
      imgUrl: 'http://s2.firstpost.in/wp-content/uploads/2016/07/Sushil-Kumar1.jpg'
    },
    {
      id: 4,
      description: 'Sindhu',
      color: '#ed1c24',
      isSelected: false,
      imgUrl: 'http://www.xyj.in/wp-content/uploads/2016/08/P-V-Sindhu-Silver-MEdal-Winner-for-India-at-Rio-Olympics-2016.jpg'
    }
    
  ];

  gotoPreviousScreen() {
    this.navCtrl.setRoot(StartComponent);
  }

  gotoLogin() {
    this.navCtrl.setRoot(LoginComponent);
  }

  selectProducer(producer: any) {
    this.navCtrl.setRoot(QuestionsComponent, {
      producer: producer
    });
    // this.slides.forEach(ele => {
    //   if (ele.id == producer.idx) {
    //     ele.isSelected = true;
    //     this.navCtrl.setRoot(QuestionsComponent, {
    //       producer: producer
    //     });
    //   }
    // })
  }
}
