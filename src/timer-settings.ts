export class TimerSettings extends HTMLElement {
    #openButton: HTMLButtonElement;
    #menu: SettingsMenu;

    #font: string;
    get font() {
        return this.#font;
    }

    set font(value: string) {
        this.#font = value;
        this.dispatchEvent(new CustomEvent('settings-changed'));
    }

    #fontSize: string;
    get fontSize() {
        return this.#fontSize;
    }
    set fontSize(value: string) {
        this.#fontSize = value;
        this.dispatchEvent(new CustomEvent('settings-changed'));
    }

    #fontColor: string;
    get fontColor() {
        return this.#fontColor;
    }
    set fontColor(value: string) {
        this.#fontColor = value;
        this.dispatchEvent(new CustomEvent('settings-changed'));
    }

    #format: string;
    get format() {
        return this.#format;
    }
    set format(value: string) {
        this.#format = value;
        this.dispatchEvent(new CustomEvent('settings-changed'));
    }


    connectedCallback() {
        this.#openButton = document.createElement('button');
        this.#openButton.innerText = 'Settings';
        this.#openButton.addEventListener('click', this.open.bind(this), true);
        this.append(this.#openButton);
    }

    open() {
        if (document.querySelector('settings-menu') != null) return;
        this.#menu = document.createElement('settings-menu') as SettingsMenu;
        this.#menu.settings = this;
        this.append(this.#menu);
    }
}

export class SettingsMenu extends HTMLElement {
    settings: TimerSettings;
    #close: HTMLButtonElement;
    #font: HTMLInputElement;
    #fontSize: HTMLInputElement;
    #fontColor: HTMLInputElement;
    #format: HTMLInputElement;

    connectedCallback() {
        const template = document.getElementById('settings-menu') as HTMLTemplateElement;
        this.append(template.content.cloneNode(true));
        this.#font = this.querySelector('#timer-font')!! as HTMLInputElement;
        this.#fontSize = this.querySelector('#timer-font-size')!! as HTMLInputElement;
        this.#fontColor = this.querySelector('#timer-font-color')!! as HTMLInputElement;
        this.#format = this.querySelector('#timer-format')!! as HTMLInputElement;
        this.#font.addEventListener('change', () => this.settings.font = this.#font.value);
        this.#fontSize.addEventListener('change', () => this.settings.fontSize = this.#fontSize.value);
        this.#fontColor.addEventListener('change', () => this.settings.fontColor = this.#fontColor.value);
        this.#format.addEventListener('change', () => this.settings.format = this.#format.value);
        this.#close = document.createElement('button');
        this.#close.innerText = 'Close';
        this.#close.addEventListener('click', this.remove.bind(this), true);
        this.append(this.#close);
    }
}

window.customElements.define('timer-settings', TimerSettings);
window.customElements.define('settings-menu', SettingsMenu);