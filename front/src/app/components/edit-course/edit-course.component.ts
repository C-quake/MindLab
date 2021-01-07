import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { EditService} from '../../services/edit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
   id:any;
  files:any=[]
  course:any;
  categories = [
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
  loginForm: any;
  user: any;
  constructor(private service: EditService,private activateroute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      selectedOption: new FormControl(null, Validators.required),
      video: new FormControl(null, Validators.required),
      pdf: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {

    this.id = this.activateroute.snapshot.params.id;

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getCourse()
    this.course=JSON.parse(localStorage.getItem("course")|| '{}')
    console.log('Course',this.course)
   

  }
  // isValid(controlName: String) {
  //   return (
  //     this.loginForm.get(controlName).invalid &&
  //     this.loginForm.get(controlName).touched
  //   );
  // }
  getCourse(){
    this.service.getcoursebyid(this.id).subscribe((res)=>{
      console.log('res',res)
      localStorage.setItem('course', JSON.stringify(res));

     

    },
    (error) => {
      console.log(error);
    },
    () => {
      console.log(this.course);
    })

  }
 
  
  onSelectVideo(event: any) {
    console.log(event.target.files)

     this.files.push(event.target.files[0])

  }
  onSelectPdf(event: any) {
    console.log(event.target.files)
    this.files.push(event.target.files[0])

  }
  EditCourse() {
    
     this.loginForm.video=this.files[1]
     this.loginForm.pdf=this.files[0]

    this.service.updateService(
        this.id,
        this.user._id,
        this.loginForm.value.title,
        this.loginForm.value.description,
        this.loginForm.pdf,
        this.loginForm.video,
        this.loginForm.value.selectedOption,
        this.loginForm.value.type, 
        this.loginForm.value.price

      )
      .subscribe((res) => {
        console.log(' product edit');
        console.log(res)
        this.videInput();
      });
  }
  videInput() {
    this.loginForm.value.title = '';
    this.loginForm.value.description = '';
    this.loginForm.pdf = '';
    this.loginForm.video = '';
    this.loginForm.value.selectedOption = '';
    this.loginForm.value.type='';
    this.loginForm.value.price='';
  }
}
