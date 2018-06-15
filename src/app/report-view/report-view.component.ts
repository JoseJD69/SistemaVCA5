import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-report-view',
    templateUrl: './report-view.component.html',
    styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
    @Input('Data') DataTemp: any;

    public DataT = this.DataTemp;

    constructor() {
    }

    ngOnInit() {
    }

}
