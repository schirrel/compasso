import { afterEach, describe, expect, it } from 'vitest';
import './cp-button.js';
import type { CpButton } from './cp-button.js';

function mount(html: string): CpButton {
  document.body.innerHTML = html;
  return document.querySelector('cp-button') as CpButton;
}

describe('cp-button', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('se registra como custom element', () => {
    expect(customElements.get('cp-button')).toBeDefined();
  });

  it('usa variant primary e size md por padrão', async () => {
    const el = mount('<cp-button>Reservar</cp-button>');
    await el.updateComplete;

    const control = el.shadowRoot!.querySelector('button')!;
    expect(control.classList.contains('primary')).toBe(true);
    expect(control.classList.contains('md')).toBe(true);
  });

  it('reflete variant e size quando mudam', async () => {
    const el = mount('<cp-button variant="ghost" size="lg">Ver</cp-button>');
    await el.updateComplete;

    const control = el.shadowRoot!.querySelector('button')!;
    expect(control.classList.contains('ghost')).toBe(true);
    expect(control.classList.contains('lg')).toBe(true);
  });

  it('dispara o clique quando habilitado', async () => {
    const el = mount('<cp-button>Confirmar</cp-button>');
    await el.updateComplete;

    let clicks = 0;
    el.addEventListener('click', () => clicks++);
    el.shadowRoot!.querySelector('button')!.click();

    expect(clicks).toBe(1);
  });

  it('não dispara o clique quando desabilitado', async () => {
    const el = mount('<cp-button disabled>Confirmar</cp-button>');
    await el.updateComplete;

    let clicks = 0;
    el.addEventListener('click', () => clicks++);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.hasAttribute('disabled')).toBe(true);
    expect(clicks).toBe(0);
  });

  it('injeta os tokens do Compasso uma única vez', async () => {
    mount('<cp-button>A</cp-button><cp-button>B</cp-button>');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.querySelectorAll('#cp-tokens')).toHaveLength(1);
  });
});
