import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// This is the default test suite that is generated when you create a new project with the Angular CLI.
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

// This is the default test that is generated when you create a new project with the Angular CLI.
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // This is the default test that is generated when you create a new project with the Angular CLI.
  it(`should have as title 'pokedex'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pokedex');
  });

  // This is the default test that is generated when you create a new project with the Angular CLI.
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('pokedex app is running!');
  });
});
