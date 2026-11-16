/**
 * Tokens de design do Compasso. São variáveis CSS com prefixo `--cp-`,
 * herdadas pelo Shadow DOM, então um tema pode ser trocado por qualquer
 * ancestral (por exemplo, `document.documentElement.style.setProperty(...)`).
 */
export const tokensCss = `
:root {
  --cp-color-primary: #1f4e79;
  --cp-color-primary-contrast: #ffffff;
  --cp-color-neutral: #5b6770;
  --cp-color-success: #2e7d32;
  --cp-color-warning: #8a5a00;
  --cp-color-danger: #b3261e;
  --cp-color-surface: #ffffff;
  --cp-color-text: #1b1f23;
  --cp-color-border: #c9d1d9;

  --cp-font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --cp-font-size-sm: 14px;
  --cp-font-size-md: 16px;
  --cp-font-size-lg: 18px;

  --cp-space-1: 4px;
  --cp-space-2: 8px;
  --cp-space-3: 12px;
  --cp-space-4: 16px;

  --cp-radius-md: 8px;
  --cp-shadow-1: 0 1px 3px rgba(0, 0, 0, 0.12);
  --cp-focus-ring: 0 0 0 3px rgba(31, 78, 121, 0.35);
}
`;

const TOKENS_ID = 'cp-tokens';

/**
 * Injeta os tokens uma única vez por documento. A checagem por id é o que
 * permite que vários microfrontends carreguem a mesma lib sem duplicar estilos.
 */
export function ensureTokens(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TOKENS_ID)) return;

  const style = document.createElement('style');
  style.id = TOKENS_ID;
  style.textContent = tokensCss;
  document.head.append(style);
}
