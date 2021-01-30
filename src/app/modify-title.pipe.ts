import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyTitle'
})
export class ModifyTitlePipe implements PipeTransform {

  transform(title: any, ...args: any[]): string {
    if (!title || title === '') {
      return null;
    }
    const selectedAutoId = args[0];
    const autoTitle = args[1];
    let returnTitle = '';
    if (selectedAutoId) {
      const selectedTitlePosition = autoTitle?.filter(opt => opt.autoId === selectedAutoId);
      selectedTitlePosition?.[0]?.autoTitle?.forEach(element => {
        if (element?.name !== 'title' && !element?.editable) {
          returnTitle += ' ' + title[0][element?.name];
        }
        else if (element?.editable) {
          returnTitle += ' ' + element?.value;
        } else {
          let titleStr = title[0]?.title;
          Object.keys(title[0]).forEach(key => {
            const findKey = selectedTitlePosition?.[0]?.autoTitle.find(obj => obj.name === key);
            if (key !== 'title' && findKey) {
              const checkWord = title[0][key].split(' ');
              checkWord.forEach(word => {
                if (titleStr.includes(word)) {
                  titleStr = titleStr.replace(word, '');
                }
              });
            }
          });
          returnTitle += ' ' + titleStr;
        }
      });
      return returnTitle;
    }

  }

}
