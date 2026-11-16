# @compasso/design-system

Design system do Compasso em Web Components, construídos com Lit 3. Os componentes
são elementos HTML nativos (`cp-*`), então funcionam em React, Vue, Angular, Svelte,
Next, Nuxt e Modern.js sem adaptadores.

## Componentes

| Elemento | Atributos | Observação |
|---|---|---|
| `<cp-button>` | `variant` (primary, secondary, ghost), `size` (sm, md, lg), `type` (button, submit, reset), `disabled` | Com `type="submit"` dentro de um `<form>`, envia o formulário |
| `<cp-badge>` | `tone` (neutral, success, warning, danger) | Selo de status |
| `<cp-card>` | `padded` | Superfície com borda e sombra |

```html
<cp-card>
  <cp-badge tone="success">Confirmada</cp-badge>
  <p>Yoga, quarta às 19h</p>
  <cp-button variant="primary" size="lg">Ver detalhes</cp-button>
</cp-card>
```

## Tokens

Os tokens são variáveis CSS com prefixo `--cp-` (cores, espaçamentos, raios, fontes).
Eles são injetados uma única vez por documento. Para mudar um tema, defina a variável
em qualquer ancestral:

```js
document.documentElement.style.setProperty('--cp-color-primary', '#0b6e4f');
```

## Uso

```ts
import '@compasso/design-system';
```

Importar o pacote registra todos os elementos. Cada componente verifica
`customElements.get` antes de se registrar, então vários microfrontends podem carregar
a mesma lib sem erro de "elemento já definido".

### React 19

Atributos com valores de texto funcionam direto. Para escutar eventos, use `ref` e
`addEventListener`, que é o caminho que funciona de forma previsível com custom elements:

```tsx
const ref = useRef<HTMLElement>(null);
useEffect(() => {
  const el = ref.current;
  el?.addEventListener('click', reservar);
  return () => el?.removeEventListener('click', reservar);
}, []);

<cp-button ref={ref} variant="secondary">Reservar</cp-button>
```

### Angular

Declare o schema de elementos customizados no componente standalone:

```ts
@Component({
  selector: 'app-reserva',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<cp-button variant="primary">Reservar</cp-button>`,
})
export class ReservaComponent {}
```

### Vue

Configure o compilador para tratar as tags `cp-*` como elementos nativos:

```ts
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('cp-');
```

## Scripts (via Nx)

```bash
pnpm nx run design-system:build
pnpm nx run design-system:test
pnpm nx run design-system:typecheck
pnpm nx run design-system:playground   # http://localhost:4300
```

## Playground

Página de testes manuais em `playground/`, servida pelo Vite. Ela importa os
componentes direto de `src/`, então salvar um componente recarrega a página.
Traz todas as variantes, controles de atributos, troca de tokens ao vivo, um
formulário para testar submit e reset, e um log de eventos.

Ao criar um componente, adicione uma seção para ele em `playground/index.html`.

## Estrutura

```
src/
  index.ts              ponto de entrada
  components/           cp-button, cp-badge, cp-card (+ testes .spec.ts)
  styles/tokens.ts      tokens e injeção única
playground/             página de testes (não entra no build da lib)
```
