import type { HTMLAttributes } from 'react';

/**
 * Tipagem JSX dos elementos do design system para o TSX.
 * Sem isso, o TypeScript não conhece <cp-button> e reclama dos atributos.
 */
type CpAttributes = HTMLAttributes<HTMLElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  padded?: boolean;
  disabled?: boolean;
  required?: boolean;
  link?: boolean;
  label?:string
  id?:string
  href?:string
  placeholder?:string
};


type CpInputAttributes = HTMLAttributes<HTMLElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  link?:boolean
  label:string
  id:string
  value:string
  placeholder?:string
  type: string;
  href?: string;
  onCpchange?: (event: Event) => void
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'cp-input': CpInputAttributes;
      'cp-button': CpAttributes;
      'cp-badge': CpAttributes;
      'cp-card': CpAttributes;
    }
  }
}
