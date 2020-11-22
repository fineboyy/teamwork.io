import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(value: any, filterString: string): unknown {

    if(value === 0 || filterString.length === 0) return value

    const resultsArray = []
    for (let i = 0; i < value.length; i++) {
      // if(value[i].title.toLowerCase() === filterString.toLowerCase()) {
      //   resultsArray.push(value[i])
      // }
      if(value[i].title.toLowerCase().includes(filterString.toLowerCase())) {
        resultsArray.push(value[i])
      }
    }
    return resultsArray;
  }

}
