import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraUserComponent } from './registra-user.component';

describe('RegistraUserComponent', () => {
  let component: RegistraUserComponent;
  let fixture: ComponentFixture<RegistraUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistraUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
