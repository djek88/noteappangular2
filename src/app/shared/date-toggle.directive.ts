import { Directive, OnInit, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[appDateToggle]',
  providers: [ DatePipe ]
})
export class DateToggleDirective implements OnInit {
  private dateFormats: string[] = ['medium', 'short', 'fullDate', 'longDate', 'mediumDate', 'shortDate'];
  private curDateFormat: string;
  @Input('appDateToggle') dateValue: string;

  constructor(
    private el: ElementRef,
    private datePipe: DatePipe,
    private render: Renderer2) { }

  ngOnInit(): void {
    this.toggle();
  }

  @HostListener('click') onClick() {
    this.toggle();
  }

  toggle(): void {
    const curIndex = this.dateFormats.indexOf(this.curDateFormat);
    const nextIndex = curIndex === this.dateFormats.length - 1 ? 0 : curIndex + 1;
    this.curDateFormat = this.dateFormats[nextIndex];

    this.render.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.datePipe.transform(this.dateValue, this.curDateFormat)
     );
  }
}
