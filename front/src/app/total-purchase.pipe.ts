import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'totalPurchase'
})
export class TotalPurchasePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    try {
      let total = 0;
      value.forEach(i => {
        const prices = i.prices.find(a => a.amount)
        total = parseFloat(String(i.qty * prices.amount))
      })
      return total;
    } catch (e) {
      return 0
    }
  }

}
