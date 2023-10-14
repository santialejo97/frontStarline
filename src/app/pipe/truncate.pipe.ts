import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit = 1000,
    completeWords = false,
    ellipsis = '...'
  ): unknown {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    return `${value.substr(0, limit)}${ellipsis}`;
  }
}
