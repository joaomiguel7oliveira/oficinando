# Design System — Oficinando

## Objetivo
Definir padrões visuais, tipografia, cores, componentes e layout para manter consistência na plataforma Oficinando.

---

## Princípios de Design
- Tipografia neutra e internacional.
- Design com aspecto tátil (neumorfismo como padrão principal).
- Alinhamento bem organizado e hierarquia visual clara.
- Glassmorfismo reservado para contextos especiais (ex.: topbar com backdrop-blur).
- Animações curtas **somente** para feedback funcional (80ms–120ms). Sem efeitos decorativos.
- Não priorize o minimalismo.

---

## Temas de Cores

### Tema Solarizado (padrão — `data-theme` ausente ou `"solarizado"`)

| Token CSS          | Valor        | Descrição                           |
|--------------------|--------------|--------------------------------------|
| `--bg-primary`     | `#fdf6e3`    | Fundo creme/off-white queimado       |
| `--bg-secondary`   | `#eee8d5`    | Cinza claro aquecido                 |
| `--surface`        | `#f8f2e7`    | Superfície elevada (cards, inputs)   |
| `--border`         | `#d9cfb1`    | Borda/divisor quente suave           |
| `--text-primary`   | `#14333a`    | Texto principal (quase preto teal)   |
| `--text-secondary` | `#526a70`    | Texto secundário/muted               |
| `--text-on-accent` | `#fdf6e3`    | Texto sobre fundos de acento         |
| `--success`        | `#2f8f95`    | Teal-sucesso (Concluída)             |
| `--warning`        | `#b58900`    | Laranja solarizado (Bloqueada)       |
| `--error`          | `#dc322f`    | Vermelho solarizado (Desclassificada)|
| `--info`           | `#0a6f7f`    | Teal primário (ações, foco, links)   |
| `--muted`          | `#a6aca8`    | Desabilitado/secundário              |
| `--radius-sm`      | `6px`        | Raio pequeno                         |
| `--radius-md`      | `10px`       | Raio médio (botões, cards)           |
| `--radius-lg`      | `14px`       | Raio grande (painéis)                |
| `--duration-fast`  | `100ms`      | Duração padrão de transição          |

### Tema Neutro (`data-theme="neutro"`)

| Token CSS          | Valor        | Descrição                            |
|--------------------|--------------|---------------------------------------|
| `--bg-primary`     | `#f2f2ef`    | Cinza muito claro                     |
| `--bg-secondary`   | `#e8e8e2`    | Cinza claro                           |
| `--surface`        | `#f7f7f3`    | Superfície elevada                    |
| `--border`         | `#d1d1ca`    | Borda cinza médio-claro               |
| `--text-primary`   | `#1d2b2e`    | Texto principal                       |
| `--text-secondary` | `#5d6b6e`    | Texto secundário                      |
| `--text-on-accent` | `#ffffff`    | Texto sobre acentos                   |
| `--success`        | `#0b7b86`    | Verde-teal neutro                     |
| `--warning`        | `#c38b17`    | Laranja neutro                        |
| `--error`          | `#c0474e`    | Vermelho neutro                       |
| `--info`           | `#0d6a9b`    | Azul neutro                           |
| `--muted`          | `#9ca1a3`    | Desabilitado                          |

---

## Tipografia

### Família
- **Padrão**: Inter (Google Fonts), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Escalas e pesos

| Nível    | Tamanho | Peso | Line-height | Uso                        |
|----------|---------|------|-------------|----------------------------|
| H1       | 24px    | 700  | 1.2         | Título da página/guia      |
| H2       | 22px    | 700  | 1.2         | Título de seção            |
| H3       | 18px    | 700  | 1.3         | Título de card/bloco       |
| Body     | 14px    | 400  | 1.5         | Texto corrido              |
| Label    | 12px    | 600  | 1.4         | Rótulos de campo e seção   |
| Caption  | 12px    | 400  | 1.4         | Textos auxiliares          |
| Overline | 11px    | 500  | —           | Supertítulo (caps/spaced)  |

- **Base do body**: `font-size: 14px`, `line-height: 1.5`
- **Overline**: `text-transform: uppercase`, `letter-spacing: 0.08em`

---

## Espaçamento
Sistema de escala baseado em 4px.

| Nome | Valor |
|------|-------|
| xs   | 4px   |
| sm   | 8px   |
| md   | 12px  |
| lg   | 16px  |
| xl   | 24px  |
| xxl  | 32px  |
| xxxl | 48px  |

---

## Elevação (Neumorfismo)

Os elementos usam sombras duplas (clara acima-esquerda, escura abaixo-direita) para criar profundidade tátil.

| Nível   | Box-shadow                                                                                      | Uso                        |
|---------|-------------------------------------------------------------------------------------------------|----------------------------|
| Base    | `inset 0 0 0 1px rgba(255,255,255,0.35)`                                                        | Área neutra, sem destaque  |
| Raised  | `-10px -10px 18px rgba(255,255,255,0.86), 10px 10px 16px rgba(160,142,111,0.28)`               | Cards, painéis             |
| Inset   | `inset -8px -8px 14px rgba(255,255,255,0.8), inset 8px 8px 14px rgba(160,142,111,0.24)`        | Campos de input internos   |
| Pressed | `inset -10px -10px 15px rgba(255,255,255,0.74), inset 10px 10px 15px rgba(160,142,111,0.34)`   | Botão pressionado          |
| Panel   | `-10px -10px 18px rgba(255,255,255,0.8), 10px 10px 18px rgba(163,145,117,0.24)`                | `.panel` (seções)          |
| Small   | `-7px -7px 13px rgba(255,255,255,0.78), 7px 7px 13px rgba(160,142,111,0.22)`                   | Cards menores              |
| Btn     | `inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 12px rgba(10,111,127,0.34)`                       | Botão primário             |

---

## Componentes

### Botões

#### Primário (`.btn-primary`)
- Fundo: `linear-gradient(120deg, var(--info), color-mix(in srgb, var(--info) 74%, #1f8f8c))`
- Texto: `var(--text-on-accent)`, peso 600
- Border-radius: `var(--radius-md)` (10px)
- Padding: `10px 16px`, min-height: 40px
- Sombra: nível Btn (ver Elevação)
- Hover: `filter: brightness(0.95)`
- Pressionado: classe `.pressed` — sombra inset
- Desabilitado: `background: color-mix(var(--muted) 30%, var(--surface))`, cursor not-allowed

#### Secundário (`.btn-secondary`)
- Fundo: `var(--surface)`, borda: `1px solid var(--border)`
- Texto: `var(--text-primary)`, sombra neumórfica Small

#### Perigo (`.btn-danger`)
- Fundo: `color-mix(in srgb, var(--error) 12%, var(--surface))`
- Borda: `1px solid color-mix(in srgb, var(--error) 50%, transparent)`
- Texto: `var(--error)`
- Hover: fundo com 20% de `--error`
- Uso: ações destrutivas (Excluir, Desclassificar)

---

### Inputs e Campos

- Seletor: `input:not([type="checkbox"]):not([type="radio"]), select`
- Fundo: `var(--surface)`, borda: `1px solid var(--border)`
- Border-radius: 8px, padding: `10px 12px`, min-height: 40px
- Sombra interna: `inset 0 1px 2px rgba(123,108,85,0.2)`
- Focus: `outline: 2px solid var(--info)`, `outline-offset: 2px`

#### Erro
- Borda: `var(--error)`, fundo: `color-mix(in srgb, var(--error) 6%, var(--surface))`
- Mensagem `.error-text`: 12px, cor `--error`

#### Label
- `.input-label`: 12px, peso 500, `display: block`, `margin-bottom: 6px`

---

### Checkbox / Radio / Switch

O input nativo é **oculto** (`position: absolute; opacity: 0; width: 1px; height: 1px`) para manter acessibilidade sem renderização visual nativa. O visual é feito com `.control-box`.

#### Checkbox (`.choice input + .control-box.checkbox`)
- Normal: `border-radius: 4px`, borda `var(--border)`, fundo `var(--surface)`, sombra inset
- Checked: fundo gradient `var(--info)`, checkmark branco via `::after` (`border-width: 0 2px 2px 0; rotate(45deg)`)

#### Radio (`.choice input + .control-box.radio`)
- Normal: `border-radius: 50%`
- Checked: `border: 5px solid var(--info)`

#### Switch (`.switch`)
- Trilha `.switch-track`: 46×26px, `border-radius: 999px`, fundo `var(--bg-secondary)`
- Knob `.switch-knob`: 18×18px, `border-radius: 50%`, sombra suave
- Checked trilha: `background: color-mix(in srgb, var(--info) 24%, var(--surface))`
- Checked knob: `transform: translateX(20px)`, `background: var(--info)`

#### Slider (`input[type="range"]`)
- Trilha: 8px, `border-radius: 999px`, fundo `color-mix(var(--muted) 35%, var(--surface))`
- Thumb: 18×18px, `background: var(--info)`, borda 2px `var(--surface)`

---

### Cards

#### Card padrão (`.module-card`, `.checklist-card`)
- Fundo: `var(--surface)`, borda: `1px solid var(--border)`
- Border-radius: 12px, padding: 12px
- Sombra: nível Small

#### Card de avaliação (`.aval-card`)
- Border-radius: 14px, padding: 14px
- Borda superior colorida de 3px por status:
  - Disponível → `var(--info)`
  - Concluída → `var(--success)`
  - Bloqueada → `var(--warning)` + `opacity: 0.88`
  - Desclassificada → `var(--error)`
- Ações do professor incluem `.btn-danger` para ação de exclusão

---

### Bloco de Questão (`.questao-card`)

Elemento para execução de tentativas.

| Elemento             | Estilo                                                              |
|----------------------|----------------------------------------------------------------------|
| `.questao-card`      | Border-radius 14px, padding 14px, sombra Small                      |
| `.questao-correta`   | Borda + fundo `--success` suave                                     |
| `.questao-errada`    | Borda + fundo `--error` suave                                       |
| `.questao-enunciado` | 15px, peso 600, line-height 1.5                                     |
| `.questao-timer`     | 13px, peso 700, cor `--warning`                                     |
| `.opcao-label`       | Flex, padding `10px 12px`, border-radius 10px, borda `--border`     |
| `.opcao-selected`    | Borda + fundo `--info` 9%, box `border: 5px solid var(--info)`      |
| `.opcao-correct`     | Borda + fundo `--success` 10%, box `border: 5px solid var(--success)`|
| `.opcao-wrong`       | Borda + fundo `--error` 8%, box `border: 5px solid var(--error)`    |

---

### Badges de Status (`.badge`)

- Border-radius: `999px` (pílula), padding: `4px 10px`
- Font-size: 12px, peso 700, min-height: 24px

| Variante   | Fundo                                   | Texto                                       | Borda                                    |
|------------|-----------------------------------------|---------------------------------------------|------------------------------------------|
| `.success` | `color-mix(--success 20%, transparent)` | `color-mix(--success 70%, #0a3039)`         | `color-mix(--success 55%, transparent)`  |
| `.info`    | `color-mix(--info 18%, transparent)`    | `color-mix(--info 75%, #092f38)`            | `color-mix(--info 55%, transparent)`     |
| `.warning` | `color-mix(--warning 18%, transparent)` | `color-mix(--warning 85%, #3d2f0b)`         | `color-mix(--warning 45%, transparent)`  |
| `.error`   | `color-mix(--error 14%, transparent)`   | `color-mix(--error 85%, #4e1a16)`           | `color-mix(--error 45%, transparent)`    |

---

### Alertas e Toasts

#### Toast (`.toast`)
- Min-height: 38px, padding: `8px 10px`, borda `var(--border)`
- Sombra neumórfica Small, botão dismiss `.dismiss` à direita

#### Alert (`.alert`)
- `border-left: 4px solid var(--info)`, fundo `color-mix(--info 22%, --surface)`

---

### Tabs (`.tab`)
- Container `.tabs`: padding 4px, border-radius 10px, sombra inset suave
- Inativa: fundo transparente, cor `var(--text-secondary)`
- Ativa `.is-active`: fundo `var(--surface)`, sombra neumórfica, cor `var(--text-primary)`

---

### Paginação (`.page-btn`)
- Normal: fundo `var(--surface)`, borda `var(--border)`, border-radius 8px
- Ativo `.is-current`: fundo `var(--info)`, cor `var(--text-on-accent)`, sem borda

---

### Tabelas

- `th`: 12px, cor `var(--text-secondary)`, padding 10px, border-bottom
- `td`: 13px, padding 10px, border-bottom

---

### Skeletons
- Fundo: `color-mix(in srgb, var(--muted) 30%, var(--surface))`
- Border-radius: 4px, sem animação (estado estático)

---

## Layout

### Estrutura geral
- Max-width: 1320px, padding: 28px, `display: grid`, gap: 18px

### Topbar (`.topbar`)
- Sticky top 0, z-index 1000, min-height: 64px, padding: `10px 18px`
- Fundo com glassmorfismo funcional: `color-mix(--surface 86%, transparent)` + `backdrop-filter: blur(8px)`
- Borda inferior: `1px solid var(--border)`

### Painel (`.panel`)
- Fundo: `var(--surface)`, border-radius 16px, padding 18px
- Sombra nível Panel

### Grid de cards
- `repeat(auto-fit, minmax(240px–280px, 1fr))`, gap 14px

### Breakpoint mobile (`max-width: 900px`)
- Padding reduz para 14px
- H1 reduz para 20px
- Panel-head empilha verticalmente
- Filters-row vira coluna única

---

## Iconografia
- Tamanho padrão: 20px (regular), 24px (destaque)
- Stroke-width: 2px, `stroke-linecap: round`, `stroke-linejoin: round`, fill: `none`
- Cor: `var(--info)` ou `currentColor` conforme contexto

---

## Motion e Transições

- Regra: **sem animações decorativas**
- `--duration-fast: 100ms`, `easing: linear`

| Caso                           | Comportamento                      |
|--------------------------------|------------------------------------|
| Hover em botão                 | `filter: brightness(0.95)`, 100ms  |
| Estado pressed                 | Sombra inset, 100ms                |
| Switch checked                 | `translateX(20px)`, 100ms          |
| Toast/alerta aparece           | Instantâneo                        |
| Modal abre (se necessário)     | ≤ 120ms                            |

---

## Acessibilidade

- Contraste mínimo texto primário/fundo: 7:1 (AAA)
- Contraste mínimo texto secundário: 4.5:1 (AA)
- Focus: `outline: 2px solid var(--info)`, `outline-offset: 2px` — visível em todos os interativos
- Área clicável mínima: 40px de altura
- Texto mínimo: 12px

### Teclado
- `Tab` / `Shift+Tab`: navegar foco
- `Enter` / `Espaço`: acionar botão, switch, checkbox
- Setas: alternar radio buttons dentro de `fieldset`

---

## Tom e Conteúdo

- Verbos diretos: **Iniciar, Salvar, Revisar, Excluir, Bloquear**
- Erros com caminho de recuperação: "Tentar novamente"
- Sem jargão técnico para alunos

| Elemento | Exemplo                                       |
|----------|-----------------------------------------------|
| Label    | Tentativas permitidas                         |
| Helper   | Valor padrão é 1 tentativa.                   |
| Erro     | Você excedeu o limite de tentativas.          |
| Sucesso  | Avaliação publicada com sucesso.              |
| Vazio    | Nenhum resultado → [Limpar filtros]           |

---

## Modo Escuro (futuro)
- `--bg-primary` → `#0B2635`, `--text-primary` → `#FDF6E3`
- Manter tokens de acento
- Usar `prefers-color-scheme: dark`
