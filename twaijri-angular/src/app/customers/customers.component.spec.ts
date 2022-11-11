import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CustomersComponent
      ],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(CustomersComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-editable-table'`, () => {
    const fixture = TestBed.createComponent(CustomersComponent);
    const app = fixture.componentInstance;
    expect("twaijri").toEqual('angular-editable-table');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CustomersComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-editable-table app is running!');
  });
});