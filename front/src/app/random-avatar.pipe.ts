import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'randomAvatar'
})
export class RandomAvatarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value}/${this.random()}`;
  }

  public random = () => {
    const myArray = ["1.png", "2.png", "3.png", "4.png"];
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

}
