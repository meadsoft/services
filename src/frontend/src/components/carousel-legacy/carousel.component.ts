import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    ElementRef,
    EventEmitter,
    input,
    output,
    signal,
    SimpleChanges,
    viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

export type DotsPosition = 'top' | 'bottom' | 'both' | 'none';

@Component({
    selector: 'haru-carousel-legacy',
    imports: [CommonModule, MatButtonModule, MatRippleModule],
    styleUrls: ['./carousel.component.css'],
    templateUrl: './carousel.component.html',
})
export class LegacyCarouselComponent {
    //inputs
    slideCount = input<number | null>(null);
    dotsPosition = input<DotsPosition>('both');
    hasArrows = input<boolean>(true);
    canClickDots = input<boolean>(true);
    slideInterval = input<number | null>(null);
    loop = input<boolean>(false);
    //
    _interval: NodeJS.Timeout | null = null;
    sliderRef = viewChild.required<ElementRef<HTMLElement>>('sliderRef');
    currentSlide = signal<number>(0);
    dotHelper = computed<number[]>(() => {
        if (this.slideCount() === null) {
            return [...Array(this._dotHelperSize()).keys()];
        }
        return [...Array(this.slideCount()).keys()];
    });
    private _dotHelperSize = signal<number>(1);
    slider = signal<KeenSliderInstance | null>(null);
    onSlideChange = output<number>();
    lastChildCount = 0;

    ngAfterViewInit() {
        this.setSlider();
        this.setupSlideInterval();
        this.setupSlideIntervalEvents();
    }

    private setupSlideIntervalEvents() {
        var slideInterval = this.slideInterval();
        if (slideInterval === null) {
            return;
        }
        var sliderRef = this.sliderRef();
        sliderRef.nativeElement.addEventListener(
            'mouseover',
            this.clearInterval.bind(this)
        );
        sliderRef.nativeElement.addEventListener(
            'mouseout',
            this.setupSlideInterval.bind(this)
        );
        sliderRef.nativeElement.addEventListener(
            'touchstart',
            this.clearInterval.bind(this)
        );
        sliderRef.nativeElement.addEventListener(
            'touchend',
            this.setupSlideInterval.bind(this)
        );
    }

    private clearInterval() {
        if (this._interval !== null) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    private setupSlideInterval() {
        var slideInterval = this.slideInterval();
        if (slideInterval === null || this._interval !== null) {
            return;
        }
        this._interval = setInterval(() => {
            var slider = this.slider();
            if (slider === null) {
                return;
            }
            slider.next();
        }, slideInterval);
    }

    updateSlider() {
        this.slider()?.update();
    }

    ngAfterContentChecked(): void {
        if (
            this.lastChildCount !==
            this.sliderRef().nativeElement.childElementCount
        ) {
            this.lastChildCount =
                this.sliderRef().nativeElement.childElementCount;
            this.updateSlider();
        }
    }

    setSlider() {
        this.setNecessarySlideClasses();
        var sliderRef = this.sliderRef();
        this.lastChildCount = sliderRef.nativeElement.childElementCount;
        var slider = new KeenSlider(sliderRef.nativeElement, {
            loop: this.loop(),
            initial: this.currentSlide(),
            slideChanged: (s) => {
                this.currentSlide.set(s.track.details.rel);
                this.onSlideChange.emit(s.track.details.rel);
            },
        });
        this.slider.set(slider);
        if (this.slideCount() === null) {
            this._dotHelperSize.set(slider.slides.length);
        }
    }

    private setNecessarySlideClasses() {
        var sliderRef = this.sliderRef();
        [...sliderRef.nativeElement.children].forEach((child) => {
            if (child.classList.contains('keen-slider__slide')) {
                return;
            }
            child.classList.add('keen-slider__slide');
        });
    }

    ngOnDestroy() {
        if (this.slider) this.slider()?.destroy();
    }

    hasDots(position: DotsPosition) {
        var currentPosition = this.dotsPosition();
        if (currentPosition === 'none') {
            return false;
        }
        return currentPosition === position || currentPosition === 'both';
    }
}
