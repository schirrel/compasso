import { LitElement, css, html } from 'lit';
import { ensureTokens } from '../styles/tokens.js';
import {customElement, query } from 'lit/decorators.js';

export type InputVariant = 'primary' | 'secondary' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'date' | 'datetime';

@customElement('cp-input')
export class CpInput extends LitElement {

    @query('input')
    element!: HTMLInputElement;

    static formAssociated = true;

    static override properties = {
        'onChange': { reflect: true },
        id: { type: String, reflect: true },
        name: { type: String, reflect: true },
        variant: { type: String, reflect: true },
        size: { type: String, reflect: true },
        type: { type: String },
        disabled: { type: Boolean, reflect: true },
        required: { type: Boolean, reflect: true },
        value: {type: String, reflect: true },
        placeholder: {type: String, reflect: true },
        inputmode: {type: String, reflect: true },
        label: {type: String, reflect: true }
    };

    declare variant: InputVariant;
    declare size: InputSize;
    declare type?: InputType;
    declare disabled?: boolean;
    declare required?: boolean;
    declare value: string;
    declare label: string;
    declare id: string;
    declare name?: string;
    declare placeholder: string;
    declare inputmode?: string;
    declare onChange: any;

    
    #internals: ElementInternals | null = null;

    constructor() {
        super();
        this.variant = 'primary';
        this.size = 'md';
        this.type = 'text';
        this.value = '';
        this.placeholder = '';
        this.inputmode = 'none';
        this.disabled = false;
        this.required = false;
        if (typeof this.attachInternals === 'function') {
            this.#internals = this.attachInternals();
        }
    }

    override connectedCallback(): void {
        super.connectedCallback();
        ensureTokens();
    }

      //work around to find if react registred this component
      get #reactHandler() {
        const reactEvtHandler =  Object.keys(this).find(key => key.indexOf('reactEventHandlers') != -1);
        const reactProps =  Object.keys(this).find(key => key.indexOf('reactProps') != -1);
        return reactEvtHandler ?? reactProps;
      }

    #setValue(newValue: string) {
        this.value = newValue;
        const inputEvent = new InputEvent("input", { "bubbles": true, data: newValue, });
        Object.defineProperty(inputEvent, 'target', {writable: false, value: this.element});
        this.#internals?.setFormValue(String(newValue));
        this.dispatchEvent(inputEvent)
        this.dispatchEvent(new InputEvent("beforeinput", { "bubbles": true, data: newValue, }))
        this.requestUpdate("value", newValue);
        if (this.#reactHandler) {
           (this as any)[this.#reactHandler].onChange(inputEvent)
        }

    }

    
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--cp-font-family);
      font-size: var(--cp-font-size-md);
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    label {
      font-family: var(--cp-font-family);
      font-size: var(--cp-font-size-sm);
    }

    input {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cp-space-2);
      width: 100%;
      max-width: 100%;
      border-radius: var(--cp-radius-md);
      border: 1px solid transparent;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 120ms ease, box-shadow 120ms ease;
      position: relative;
      box-sizing: border-box;
    }

    .cp-input-wrapper {
      position: relative;
      display: flex;
      align-items: start;
      justify-content: start;
      width: 100%;
      max-width: 100%;
      flex-direction: column;
    }

    input:focus-visible {
      outline: none;
      box-shadow: var(--cp-focus-ring);
    }

    input:disabled {
      cursor: not-allowed;
    }

    /* Variantes */
    .primary {
      background: #eef4fa;
      border: 1px solid var(--cp-color-primary);
      color: var(--cp-color-primary-primary);
    }
    .primary:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    .ghost {
      background: transparent;
      border: 1px solid var(--cp-color-border);
      color: var(--cp-color-border);
     
    }
    .ghost:hover:not(:disabled) {
      background: #eef4fa;
    }

    /* Tamanhos */
    .sm {
      padding: var(--cp-space-1) var(--cp-space-3);
      font-size: var(--cp-font-size-sm);
    }
    .md {
      padding: var(--cp-space-2) var(--cp-space-4);
      font-size: var(--cp-font-size-md);
    }
    .lg {
      padding: var(--cp-space-3) var(--cp-space-4);
      font-size: var(--cp-font-size-lg);
    }
  `;

    override render() {
      return html`
        <div class="cp-input-wrapper">
            <label for="">${this.label}${this.required ? html`<span aria-label="required field"> *</span>` : ''}: </label>
            
            <input
                part="control"
                class="${this.variant} ${this.size}"
                type="${this.type}"
                value="${this.value}"
                ?disabled=${this.disabled}
                ?required=${this.required}
                aria-disabled=${this.disabled ? 'true' : 'false'}
                @input="${(e: HTMLElementEventMap | any) => this.#setValue(e.target.value)}"
                />
            </div>
        `
    }

}


if (!customElements.get('cp-input')) {
  customElements.define('cp-input', CpInput);
}
