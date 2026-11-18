/**
 * Type declarations for @compasso/design-system web components in Vue templates.
 *
 * Vue uses the GlobalComponents interface to provide autocompletion and
 * type-checking for custom element attributes in <template> blocks.
 */

interface CpButtonAttributes {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

interface CpBadgeAttributes {
  tone?: 'neutral' | 'success' | 'warning' | 'danger'
}

interface CpCardAttributes {
  padded?: boolean
}

declare module 'vue' {
  interface GlobalComponents {
    'cp-button': CpButtonAttributes
    'cp-badge': CpBadgeAttributes
    'cp-card': CpCardAttributes
  }
}

export {}
