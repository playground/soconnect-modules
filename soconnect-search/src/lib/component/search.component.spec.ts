import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchModule} from './search.module';
import {Component} from '@angular/core';


describe('SearchModule', () => {

  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: any;
  let compiled: any;
  let search: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      providers: [],
      imports: [SearchModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    search = fixture.debugElement.children[0].children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should render search input with right placeholder', () => {
    const input: any = compiled.querySelector('.search .wxwidget-location-search');
    expect(input.placeholder).toContain('Search city or zip');
  });

  it('should emit inputed value', async(() => {
    const input: any = compiled.querySelector('.search .wxwidget-location-search');
    input.value = 'Kiev';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(testHost.result).toBe('Kiev');
    });
  }));

});

@Component({
  template: `
    <div class="root">
      <twc-search class="search"
                  (searchRun)="search($event)"
                  (searchClose)="toggleSearch()">
      </twc-search>
    </div>`,
  styles: [`
    .root {
      max-width: 200px;
    }`]
})
class TestHostComponent {

  public result: string = '';

  search(data: string) {
    this.result = data;
  }

  toggleSearch() {
    this.result = 'toggled';
  }
}
