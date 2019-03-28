import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
