// Importa o código-fonte (não o dist), para ter recarga automática ao editar.
import '../src/index.js';

const root = document.documentElement;

/* ---------- Tema: altera tokens --cp-* no :root ---------- */
const tokenInputs = document.querySelectorAll<HTMLInputElement>('[data-token]');
const defaults = new Map<HTMLInputElement, string>();

tokenInputs.forEach((input) => {
  defaults.set(input, input.value);
  input.addEventListener('input', () => {
    root.style.setProperty(input.dataset.token!, input.value + (input.dataset.unit ?? ''));
  });
});

document.querySelector('#reset-tema')?.addEventListener('click', () => {
  tokenInputs.forEach((input) => {
    input.value = defaults.get(input)!;
    root.style.removeProperty(input.dataset.token!);
  });
});

/* ---------- Controles: ligam selects e checkboxes a atributos ---------- */
document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-target]').forEach((control) => {
  const target = document.querySelector(control.dataset.target!);
  const attr = control.dataset.attr!;
  if (!target) return;

  control.addEventListener('change', () => {
    if (control instanceof HTMLInputElement && control.type === 'checkbox') {
      target.toggleAttribute(attr, control.checked);
    } else {
      target.setAttribute(attr, control.value);
    }
  });
});

/* ---------- Card sem padding ---------- */
// `padded` é booleano com padrão true; para desligar, define-se a propriedade.
const cardSemPadding = document.querySelector('#card-sem-padding') as (HTMLElement & { padded: boolean }) | null;
customElements.whenDefined('cp-card').then(() => {
  if (cardSemPadding) cardSemPadding.padded = false;
});

/* ---------- Log de eventos ---------- */
const log = document.querySelector<HTMLOListElement>('#log')!;

function write(message: string): void {
  const item = document.createElement('li');
  item.textContent = `${new Date().toLocaleTimeString('pt-BR')}  ${message}`;
  log.prepend(item);
}

document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest('cp-button');
  if (!button) return;
  const label = button.textContent?.trim() ?? '';
  write(`click em cp-button "${label}"${button.hasAttribute('disabled') ? ' (desabilitado)' : ''}`);
});

const form = document.querySelector<HTMLFormElement>('#form-demo')!;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  write(`submit do formulário: ${JSON.stringify(Object.fromEntries(new FormData(form)))}`);
});
form.addEventListener('reset', () => write('reset do formulário'));

document.querySelector('#limpar-log')?.addEventListener('click', () => log.replaceChildren());
