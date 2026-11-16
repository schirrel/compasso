import { LitElement, css, html } from 'lit';
import { ensureTokens } from '../styles/tokens.js';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger';

/**
 * Selo de status curto, por exemplo "Confirmada" ou "Lista de espera".
 * Use `tone` para indicar a situação: neutral | success | warning | danger.
 */
export class CpBadge extends LitElement {
  static override properties = {
    tone: { type: String, reflect: true },
  };

  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--cp-font-family);
    }

    span {
      display: inline-block;
      padding: 2px var(--cp-space-2);
      border-radius: 999px;
      font-size: var(--cp-font-size-sm);
      font-weight: 600;
      line-height: 1.6;
      white-space: nowrap;
    }

    .neutral {
      background: #e7ebef;
      color: var(--cp-color-neutral);
    }
    .success {
      background: #e3f1e4;
      color: var(--cp-color-success);
    }
    .warning {
      background: #fbefd9;
      color: var(--cp-color-warning);
    }
    .danger {
      background: #f9e1df;
      color: var(--cp-color-danger);
    }
  `;

  declare tone: BadgeTone;

  constructor() {
    super();
    this.tone = 'neutral';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    ensureTokens();
  }

  override render() {
    return html`<span class="${this.tone}"><slot></slot></span>`;
  }
}

if (!customElements.get('cp-badge')) {
  customElements.define('cp-badge', CpBadge);
}
