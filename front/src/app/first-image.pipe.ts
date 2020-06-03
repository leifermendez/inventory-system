import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstImage'
})
export class FirstImagePipe implements PipeTransform {

  transform(value: [], ...args: unknown[]): unknown {
    try {
      const first = value.find((img: any) => img);
      // @ts-ignore
      return first[args[0]];
    } catch (e) {
      return null;
    }
  }

}
