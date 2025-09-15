import { Component, OnInit } from '@angular/core';
import { InterfacesApiService, Results, RandomUser } from '../Services/RandomUser/interfaces-api.service'

@Component({
  selector: 'app-random-user-api-interfaces',
  standalone: false,
  templateUrl: './random-user-api-interfaces.component.html',
  styleUrl: './random-user-api-interfaces.component.css'
})

//Implements implementa interfaces
export class RandomUserApiInterfacesComponent implements OnInit{
  randomUser!: RandomUser;
  constructor(private InterfacesApiService: InterfacesApiService) { }

  ngOnInit() {
    this.getRandomUser();
  }

  getRandomUser() {
    this.InterfacesApiService.getRandomUser().subscribe((data: Results) => {
      console.log('RandomUser: ', data);
      this.randomUser = data.results[0];
      console.log(this.randomUser)

    });
  }
}
