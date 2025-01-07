import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KieServerComponent } from './kie-server.component';

describe('KieServerComponent', () => {
  let component: KieServerComponent;
  let fixture: ComponentFixture<KieServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KieServerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KieServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
