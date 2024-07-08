import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore',
})
export class SeeMorePipe implements PipeTransform {
  transform(overView: string, count: number): string {
    return overView.split(' ').slice(0, count).join(' ');
  }
}
