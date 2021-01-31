import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AutoTitleService } from '../auto-title.service';

@Component({
  selector: 'app-auto-title',
  templateUrl: './auto-title.component.html',
  styleUrls: ['./auto-title.component.less']
})
export class AutoTitleComponent implements OnInit {
  autoTileForm = [];
  public autoTitles = [];
  public selectedTitleId = '';
  public apiInprocess = false;
  public autotitleChanges = false;
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

  constructor(private autoTitleService: AutoTitleService) { }

  ngOnInit(): void {
    this.getAutoTitle();
  }

  getAutoTitle() {
    this.autoTitleService.getAutoTitle().subscribe(data => {
      if (data?.result?.length) {
        data?.result.forEach(titles => {
          const options = {
            autoId: titles?.autoId,
            autoTitle: JSON.parse(titles?.options)
          };
          this.autoTileForm.push(options);
        });
      }
    });
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
    // create auto title
    this.apiInprocess = true;
    this.autoTitleService.createAutoTitle(options).subscribe(data => {
      console.log('data', data);
      this.autoTileForm.push(options);
      this.apiInprocess = false;
    }, error => {
      this.apiInprocess = false;
    });
  }

  addOption(option, index) {
    this.autotitleChanges = true;
    const findIndex = this.autoTileForm[index]?.autoTitle.findIndex(opt => opt['name'] === option?.['name']);
    if (findIndex < 0) {
      this.autoTileForm[index].autoTitle.push(this.newAutotitleOption(option));
    } else {
      this.autoTileForm[index].autoTitle.splice(findIndex, 1);
    }
  }

  removeOption(option, index) {
    this.autotitleChanges = true;
    const findIndex = this.autoTileForm[index]?.autoTitle.findIndex(opt => opt['name'] === option?.['name']);
    if (findIndex >= 0) {
      this.autoTileForm[index].autoTitle.splice(findIndex, 1);
    }
  }

  getSelected(option, index) {
    return this.autoTileForm[index]?.autoTitle.find(opt => opt['name'] === option?.['name']);
  }

  updateAutoTitle() {
    this.apiInprocess = true;
    this.autotitleChanges = false;
    this.autoTileForm.forEach(autotitle => {
      this.autoTitleService.updateAutoTitle(autotitle?.['autoId'], autotitle).subscribe(data => {
        this.apiInprocess = false;
      }, error => {
        this.autotitleChanges = true;
        this.apiInprocess = false;
      });
    });
  }
}
