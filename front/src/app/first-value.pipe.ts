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
      return (args.length) ? first[args]: first;
    } catch (e) {
      return null;
    }
  }

}
