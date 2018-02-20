import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicboxComponent } from './musicbox.component';

describe('MusicboxComponent', () => {
  let component: MusicboxComponent;
  let fixture: ComponentFixture<MusicboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
