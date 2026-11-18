/**
 * Ponto de entrada do design system do Compasso.
 *
 * Importar este arquivo registra todos os elementos `cp-*` no `customElements`.
 * Os componentes também são exportados para uso tipado (por exemplo, em TSX).
 */
export { CpButton } from './components/cp-button.js';
export type { ButtonSize, ButtonType, ButtonVariant } from './components/cp-button.js';

export { CpInput } from './components/cp-input.js';
export type { InputSize, InputType, InputVariant } from './components/cp-input.js';

export { CpLoading } from './components/cp-loading.js';
export type { LoadingSize, LoadingVariant } from './components/cp-loading.js';

export { CpBadge } from './components/cp-badge.js';
export type { BadgeTone } from './components/cp-badge.js';

export { CpCard } from './components/cp-card.js';

export { tokensCss, ensureTokens } from './styles/tokens.js';

