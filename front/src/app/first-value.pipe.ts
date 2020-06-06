import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'firstValue'
})
export class FirstValuePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    try {

      // @ts-ignore
      const first = value.find((img: any) => img);
      // @ts-ignore
      const n =  (args.length) ? first[args]: first;
      return parseFloat(n);
    } catch (e) {
      return null;
    }
  }

}
