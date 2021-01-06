import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { InstructorService } from '../../services/instructor-service.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent {
  instructor: any = [];
  student: any = [];
  doughnutChartLabels: Label[] = ['Instructor', 'Student', 'Courses'];
  doughnutChartData: MultiDataSet = [[this.instructor.length, 25, 20]];
  doughnutChartType: ChartType = 'doughnut';

  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.allinstructor();
    this.allstudent();
  }
  allinstructor() {
    this.instructorService.getAllInstructors().subscribe((res) => {
      console.log(res);
      this.instructor = res.data;
    });
  }
  allstudent() {
    this.studentService.findStudents().subscribe((res) => {
      console.log(res);
      this.student = res.data;
    });
  }
}
