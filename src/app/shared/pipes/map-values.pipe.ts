import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapValues',
  pure: true
})
export class MapValuesPipe implements PipeTransform {

  transform(value: any, args?: any[]): Object[] {
    const returnArray = [];
    if (!!value) {
      value.forEach((entryValue, entryKey) => {
        returnArray.push({
          key: entryKey,
          value: entryValue
        });
      });
    }

    return returnArray;
  }

}
