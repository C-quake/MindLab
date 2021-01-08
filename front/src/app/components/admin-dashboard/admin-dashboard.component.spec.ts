import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:front/src/app/components/admin-dashboard/admin-dashboard.component.spec.ts
import { AdminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardComponent ]
=======
import { StatisticComponent } from './statistic.component';

describe('StatisticComponent', () => {
  let component: StatisticComponent;
  let fixture: ComponentFixture<StatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticComponent ]
>>>>>>> a91f4a0f48df1cd0d1dda2d5670cc425e8ff51a9:front/src/app/components/statistic/statistic.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:front/src/app/components/admin-dashboard/admin-dashboard.component.spec.ts
    fixture = TestBed.createComponent(AdminDashboardComponent);
=======
    fixture = TestBed.createComponent(StatisticComponent);
>>>>>>> a91f4a0f48df1cd0d1dda2d5670cc425e8ff51a9:front/src/app/components/statistic/statistic.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
