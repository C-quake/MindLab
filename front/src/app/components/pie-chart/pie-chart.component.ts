import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { InstructorService } from '../../services/instructor-service.service';
import { StudentService } from '../../services/student.service';
import { StoreService } from '../../services/store.service';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  instructor: any = [];
  student: any = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [
    'Math',
    'physics',
    'chemistry',
    'languages',
    'biology',
    'geology',
    'computer science',
    'economic',
    'management',
    'finance',
    'history ',
    'geography',
    'philosophy',
    'others',
  ];
  pieChartData: any;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService,
    private storeservice: StoreService
  ) {}
  ngOnInit(): void {
    this.allcouses().subscribe((data: any) => {
      var obj = {
        Math: 0,
        physics: 0,
        chemistry: 0,
        languages: 0,
        biology: 0,
        geology: 0,
        'computer science': 0,
        economic: 0,
        management: 0,
        finance: 0,
        history: 0,
        geography: 0,
        philosophy: 0,
        others: 0,
      };

      for (var ele of data) {
        obj[ele.category]++;
      }
      this.pieChartData = [
        obj.Math,
        obj.physics,
        obj.chemistry,
        obj.languages,
        obj.biology,
        obj.geology,
        obj['computer science'],
        obj.economic,
        obj.management,
        obj.finance,
        obj.history,
        obj.geography,
        obj.philosophy,
        obj.others,
      ];
    });
  }
  allinstructor() {
    return this.instructorService.getAllInstructors();
  }
  allstudent() {
    return this.studentService.getAllStudents();
  }
  allcouses() {
    return this.storeservice.getService();
  }
}
