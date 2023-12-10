import { defaultFormat } from './defaults';
import { formatTime } from './format';
import { TimerSettings } from './timer-settings';
import { swap } from './utils';

export class Timer extends HTMLElement {
    #remaining: number = 2 * 60 * 60 * 1000;
    #visual: TimerVisual;
    #paused: boolean = false;
    #previous: number = 0;
    #pauseButton: HTMLButtonElement;
    #settings: TimerSettings;

    connectedCallback() {
        this.start();
        this.#settings = document.querySelector('timer-settings') as TimerSettings;
        this.#visual = document.createElement('timer-visual') as TimerVisual;
        this.#pauseButton = document.createElement('button');
        this.#pauseButton.innerText = 'Pause';
        this.#pauseButton.setAttribute('type', 'button');
        this.#pauseButton.addEventListener('click', this.pause.bind(this), true);
        this.append(this.#visual);
        this.append(this.#pauseButton);
    }

    start() {
        this.#previous = Date.now();
        window.requestAnimationFrame(this.tick.bind(this));
    }

    pause() {
        this.#paused = true;
        this.#pauseButton = swap(this.#pauseButton, this.#pauseButton.cloneNode(true) as HTMLButtonElement);
        this.#pauseButton.innerText = 'Resume';
        this.#pauseButton.addEventListener('click', this.resume.bind(this), true);
    }

    resume() {
        this.#paused = false;
        this.#previous = Date.now();
        this.#pauseButton = swap(this.#pauseButton, this.#pauseButton.cloneNode(true) as HTMLButtonElement);
        this.#pauseButton.innerText = 'Pause';
        this.#pauseButton.addEventListener('click', this.pause.bind(this), true);
        window.requestAnimationFrame(this.tick.bind(this));
    }

    tick() {
        this.#remaining -= Date.now() - this.#previous;

        this.#previous = Date.now();
        if (this.#remaining > 0) {
            this.#visual.setValue(formatTime(this.#remaining, this.#settings.format || defaultFormat));

            if (!this.#paused) window.requestAnimationFrame(this.tick.bind(this));
        }
    }
}

export class TimerVisual extends HTMLElement {
    #settings: TimerSettings;
    #element: HTMLParagraphElement;

    constructor() { super(); console.log('creating new TimerVisual reference'); }

    connectedCallback() {
        this.#element = document.createElement('p');
        this.append(this.#element);
        this.#settings = document.querySelector('timer-settings') as TimerSettings;
        this.#settings.addEventListener('settings-changed', this.update.bind(this), true);
    }

    update() {
        this.#element.style.fontFamily = this.#settings.font;
        this.#element.style.fontSize = this.#settings.fontSize + 'px';
        this.#element.style.color = this.#settings.fontColor;
    }

    setValue(value: string) {
        this.#element.innerText = value;
    }
}

window.customElements.define('timer-', Timer);
window.customElements.define('timer-visual', TimerVisual);