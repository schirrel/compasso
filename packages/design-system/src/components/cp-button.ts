import { LitElement, css, html } from 'lit';
import { ensureTokens } from '../styles/tokens.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Botão do Compasso.
 *
 * Atributos: `variant` (primary | secondary | ghost), `size` (sm | md | lg),
 * `type` (button | submit | reset) e `disabled`.
 *
 * Quando `type="submit"` ou `type="reset"` está dentro de um `<form>`, o
 * componente envia ou limpa esse formulário, pois o botão nativo fica dentro
 * do Shadow DOM e não associaria o formulário sozinho.
 */
export class CpButton extends LitElement {
  static formAssociated = true;

  static override properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    type: { type: String },
    disabled: { type: Boolean, reflect: true },
    link: { type: Boolean, reflect: true },
    href: { type: String, reflect: true },
  };

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

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cp-space-2);
      width: 100%;
      border-radius: var(--cp-radius-md);
      border: 1px solid transparent;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 120ms ease, box-shadow 120ms ease;
    }

    button:focus-visible {
      outline: none;
      box-shadow: var(--cp-focus-ring);
    }

    button:disabled {
      cursor: not-allowed;
    }

    /* Variantes */
    .primary {
      background: var(--cp-color-primary);
      color: var(--cp-color-primary-contrast);
    }
    .primary:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    .secondary {
      background: var(--cp-color-surface);
      color: var(--cp-color-primary);
      border-color: var(--cp-color-primary);
    }
    .secondary:hover:not(:disabled) {
      background: #eef4fa;
    }

    .ghost {
      background: transparent;
      color: var(--cp-color-primary);
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

  declare variant: ButtonVariant;
  declare size: ButtonSize;
  declare type: ButtonType;
  declare disabled: boolean;
  declare link?: boolean;
  declare href?:string;

  #internals: ElementInternals | null = null;

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'md';
    this.type = 'button';
    this.disabled = false;
    if (typeof this.attachInternals === 'function') {
      this.#internals = this.attachInternals();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    ensureTokens();
  }

  #onClick = (): void => {
    if (this.disabled) return;

    const form = this.#internals?.form;
    if (!form) return;

    if (this.type === 'submit') form.requestSubmit();
    if (this.type === 'reset') form.reset();
  };

  override render() {
    return this.link ? 
    html`<a
        part="control"
        class="${this.variant} ${this.size}"
        href=${this.href}
      >
        <slot></slot>
      </a>`
    : html`
      <button
        part="control"
        class="${this.variant} ${this.size}"
        type="button"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this.#onClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get('cp-button')) {
  customElements.define('cp-button', CpButton);
}
