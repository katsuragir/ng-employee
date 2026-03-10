import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeList } from './employee-list';

describe('EmployeeList', () => {
  let component: EmployeeList;
  let fixture: ComponentFixture<EmployeeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeList],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link paginator to dataSource', async () => {
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should have 100 items in dataSource.data', () => {
    expect(component.dataSource.data.length).toBe(100);
  });

  it('should default to page size 10 from service', () => {
    expect(component.paginator.pageSize).toBe(10);
  });
});
