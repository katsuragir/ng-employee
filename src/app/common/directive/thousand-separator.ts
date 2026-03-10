import { Directive, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[thousandSeparator]',
  standalone: true
})
export class ThousandSeparatorDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit(): void {
    // Pastikan control sudah terinisialisasi
    if (this.control.control) {
      // Formating awal jika sudah ada nilai
      this.formatValue(this.control.control.value);

      // Menangani perubahan programatik (seperti patchValue)
      this.control.control.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.formatValue(value);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const value = input.value;
    // 1. Hapus karakter non-numerik
    const numericValue = value.replace(/[^0-9]/g, '');

    // 2. Format untuk UI
    const formattedValue = this.formatNumber(numericValue);

    // 3. Update tampilan (view)
    input.value = formattedValue;

    // 4. Update model (form control)
    if (this.control.control) {
      this.control.control.setValue(numericValue, {
        emitModelToViewChange: false // Kita sudah update view secara manual
      });
      this.control.control.markAsDirty();
    }
  }

  private formatNumber(value: string): string {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  private formatValue(value: any) {
    const input = this.el.nativeElement as HTMLInputElement;
    if (!input) return;

    if (value !== null && value !== undefined) {
      const numericString = value.toString().replace(/[^0-9]/g, '');
      const formatted = this.formatNumber(numericString);
      if (input.value !== formatted) {
        input.value = formatted;
      }
    } else {
      input.value = '';
    }
  }
}
