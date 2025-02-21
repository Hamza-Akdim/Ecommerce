import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmDropComponent } from './dialog-confirm-drop.component';

describe('DialogConfirmDropComponent', () => {
  let component: DialogConfirmDropComponent;
  let fixture: ComponentFixture<DialogConfirmDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmDropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogConfirmDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
