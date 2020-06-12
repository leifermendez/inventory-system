import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'countSearchData'
})
export class CountSearchDataPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    try {
      let counter = 0;
      Object.values(value).map((a: any) => {
        counter += a.totalDocs
      })
      return counter;
    } catch (e) {
      return null
    }
  }

}
