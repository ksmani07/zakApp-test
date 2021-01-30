import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auto-title',
  templateUrl: './auto-title.component.html',
  styleUrls: ['./auto-title.component.less']
})
export class AutoTitleComponent implements OnInit {
  autoTileForm = [];
  public autoTitles = [];
  public selectedTitleId = '';
  public titles = [
    {
      title: 'Apple iPhone 15GB',
      brand: 'Apple',
      color: 'White',
      gender: 'Unisex',
      age_group: '20+',
      size: '15GB'
    }
  ];
  public autoTitleOptions =
    [
      {
        name: 'title',
        value: 'title',
        editable: false,
        selected: true,
        default: true
      },
      {
        name: 'brand',
        value: 'brand',
        editable: false,
        selected: false,
        default: false
      },
      {
        name: 'color',
        value: 'color',
        editable: false,
        selected: false,
        default: false
      },
      {
        name: 'gender',
        value: 'gender',
        editable: false,
        selected: false,
        default: false
      },
      {
        name: 'age_group',
        value: 'age group',
        editable: false,
        selected: false,
        default: false
      },
      {
        name: 'size',
        value: 'size',
        editable: false,
        selected: false,
        default: false
      },
      {
        name: 'Add_Custom_Text',
        value: 'Add Custom Text',
        editable: true,
        selected: false,
        default: false
      },
    ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  newAutotitleOption(option) {
    return {
      name: option?.name,
      value: option?.value,
      editable: option?.editable,
      selected: true,
    };
  }


  addAutoTitle() {
    const defaultOption = this.autoTitleOptions.filter(opt => opt.default);
    const autoIncrementId = 'A' + (this.autoTileForm.length + 1).toString().padStart(3, '0');
    const options = {
      autoId: autoIncrementId,
      autoTitle: []
    };
    options.autoTitle.push(this.newAutotitleOption(defaultOption[0]));
    this.autoTileForm.push(options);
  }
  addOption(option, index) {
    const findIndex = this.autoTileForm[index]?.autoTitle.findIndex(opt => opt['name'] === option?.['name']);
    if (findIndex < 0){
      this.autoTileForm[index].autoTitle.push(this.newAutotitleOption(option));
    } else {
      this.autoTileForm[index].autoTitle.splice(findIndex, 1);
    }
  }

  removeOption(option, index){
    const findIndex = this.autoTileForm[index]?.autoTitle.findIndex(opt => opt['name'] === option?.['name']);
    if (findIndex >= 0){
      this.autoTileForm[index].autoTitle.splice(findIndex, 1);
    } 
  }

  getSelected(option, index) {
   return this.autoTileForm[index]?.autoTitle.find(opt => opt['name'] === option?.['name']);
  }
}
