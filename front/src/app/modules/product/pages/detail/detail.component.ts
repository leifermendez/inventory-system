import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor() {
  }

  public text: any;
  public history: any = [
    {
      name:'Producto'
    }
  ]

  ngOnInit(): void {
    this.text = ` <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque et nulla possimus quaerat quam reiciendis
        sequi, voluptatum. Accusamus doloremque error iure, laboriosam nesciunt nobis pariatur repellat, rerum
        temporibus, veritatis vero.
      </p>`;
  }

}
