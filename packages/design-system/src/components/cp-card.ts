import { LitElement, css, html } from 'lit';
import { ensureTokens } from '../styles/tokens.js';

/**
 * Superfície de conteúdo com borda arredondada e sombra leve.
 * O conteúdo vai no slot padrão; `padded` (padrão: true) controla o espaçamento interno.
 */
export class CpCard extends LitElement {
  static override properties = {
    padded: { type: Boolean, reflect: true },
  };

  static override styles = css`
    :host {
      display: block;
      font-family: var(--cp-font-family);
      color: var(--cp-color-text);
    }

    .surface {
      position: relative;
      background: var(--cp-color-surface);
      border: 1px solid var(--cp-color-border);
      border-radius: var(--cp-radius-md);
      box-shadow: var(--cp-shadow-1);
      padding: var(--cp-space-4);
    }

    :host(:not([padded])) .surface {
      padding: 0;
    }
  `;

  declare padded: boolean;

  constructor() {
    super();
    this.padded = true;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    ensureTokens();
  }

  override render() {
    return html`<section class="surface" part="surface"><slot></slot></section>`;
  }
}

if (!customElements.get('cp-card')) {
  customElements.define('cp-card', CpCard);
}
