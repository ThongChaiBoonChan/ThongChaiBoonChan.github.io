import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModeCard } from './import-mode-card';

describe('ImportModeCard', () => {
  let component: ImportModeCard;
  let fixture: ComponentFixture<ImportModeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportModeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportModeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
