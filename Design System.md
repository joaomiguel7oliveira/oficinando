# Design System - Aparência dos Elementos

## Objetivo
Definir padrões visuais, tipografia, cores, componentes e layout para manter consistência na plataforma Oficinando.

## Princípios de Design
- Tipografia neutra e internacional com aspecto tátil.
- Alinhamento bem organizado.
- Efeitos neumorfistas como padrão principal.
- Glassmorfismo quando necessário (contextos especiais).
- Sem animações suaves longas; priorizar transições instantâneas.
- Não minimalista; usar espaçamento generoso e contrastes legíveis.

## Tema de Cores

### Tema Solarizado (Padrão)
Tonalidades de branco queimado e off-white como base.

#### Paleta principal
- **Fundo primário**: #FDF6E3 (creme/off-white queimado)
- **Fundo secundário**: #EEE8D5 (cinza claro aquecido)
- **Superfícies elevadas**: #F9F5ED (branco queimado muito claro)
- **Borda/divisor**: #D6CEAD (cinza quente suave)

#### Acentos e estados
- **Sucesso**: #859900 (verde amarelado do solarizado)
- **Atenção/Aviso**: #B58900 (laranja solarizado)
- **Erro/Desclassificação**: #DC322F (vermelho solarizado)
- **Informação**: #268BD2 (azul solarizado)
- **Desabilitado/Secundário**: #93A1A1 (cinza neutro)

#### Texto
- **Texto primário**: #073642 (cinza muito escuro do solarizado)
- **Texto secundário**: #586E75 (cinza médio do solarizado)
- **Texto sobre acentos**: #FDF6E3 (fundo primário para contraste)

### Tema Neutro (Alternativo)
Tons de cinza tradicionais.

#### Paleta principal
- **Fundo primário**: #F5F5F5 (cinza muito claro)
- **Fundo secundário**: #E8E8E8 (cinza claro)
- **Superfícies elevadas**: #FAFAFA (quase branco)
- **Borda/divisor**: #D0D0D0 (cinza médio-claro)

#### Acentos e estados
- **Sucesso**: #28A745 (verde padrão)
- **Atenção/Aviso**: #FFC107 (amarelo padrão)
- **Erro/Desclassificação**: #DC3545 (vermelho padrão)
- **Informação**: #007BFF (azul padrão)
- **Desabilitado/Secundário**: #6C757D (cinza neutro)

#### Texto
- **Texto primário**: #212529 (cinza muito escuro)
- **Texto secundário**: #6C757D (cinza médio)
- **Texto sobre acentos**: #FFFFFF (branco puro)

## Tipografia

### Família de fontes
- **Padrão**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Alternativa se necessário**: Roboto, Open Sans

### Escalas e pesos

#### Títulos (H1-H6)
- **H1 (36px)**: Peso 700 (bold), line-height 1.2, letter-spacing -0.5px
- **H2 (28px)**: Peso 700, line-height 1.3, letter-spacing -0.3px
- **H3 (24px)**: Peso 600 (semibold), line-height 1.3
- **H4 (20px)**: Peso 600, line-height 1.4
- **H5 (16px)**: Peso 600, line-height 1.4
- **H6 (14px)**: Peso 600, line-height 1.5

#### Corpo
- **Body Large (16px)**: Peso 400, line-height 1.5
- **Body Regular (14px)**: Peso 400, line-height 1.6
- **Body Small (12px)**: Peso 400, line-height 1.5

#### Label e Button
- **Label (14px)**: Peso 500, line-height 1.4
- **Button (14px)**: Peso 600, line-height 1.4
- **Caption (12px)**: Peso 400, line-height 1.4

## Espaçamento
Sistema de escala baseado em 4px.

- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px
- xxxl: 48px

## Componentes

### Botões
#### Primário (CTA principal)
- Fundo: cor de acento (sucesso, informação)
- Texto: branco/off-white
- Peso: 600
- Padding: 12px 24px (md vertical, lg horizontal)
- Border-radius: 8px
- Transição: instantânea (sem duração)
- Hover: intensidade 10% mais escura
- Desabilitado: opacidade 50%, cursor não-permitido

#### Secundário (ação alternativa)
- Fundo: transparente ou fundo secundário
- Borda: 1px solid, cor de acento
- Texto: cor de acento
- Peso: 600
- Padding: 11px 23px (descontar borda)
- Border-radius: 8px
- Transição: instantânea (sem duração)
- Hover: fundo levemente preenchido com cor de acento (opacidade 10%)

#### Desabilitado
- Fundo: cor desabilitado
- Texto: fundo primário
- Cursor: not-allowed
- Sem hover/transição

#### Carregando
- Exibir spinner inline (12px) à esquerda do texto
- Botão fica desabilitado
- Spinner estático (sem animação)

### Cards
#### Estrutura
- Fundo: superfícies elevadas
- Borda: 1px solid cor borda
- Border-radius: 12px
- Padding: xl (24px)
- Box-shadow (neumorfismo): 
  - Light: inset 0 1px 2px rgba(0,0,0,0.05)
  - Dark (tema): 0 4px 12px rgba(0,0,0,0.08)

#### Hover
- Mudança de sombra instantânea
- Shadow aumenta: 0 8px 20px rgba(0,0,0,0.12)

### Inputs e Campos
#### Texto/Select
- Fundo: fundo primário
- Borda: 1px solid cor borda
- Border-radius: 6px
- Padding: md (12px)
- Altura: 40px mínimo
- Font-size: 14px
- Focus: borda 2px solid cor informação, box-shadow suave azul

#### Label
- Font-size: 12px
- Peso: 500
- Cor: texto primário
- Margin-bottom: 4px
- Display: block

#### Erro
- Borda: 2px solid erro
- Background: rgba(erro, 0.05)
- Mensagem de erro: font-size 12px, cor erro, margin-top 4px

#### Desabilitado
- Fundo: fundo secundário
- Borda: 1px solid cor desabilitado
- Cor texto: texto secundário
- Cursor: not-allowed

### Badges/Chips de Status
#### Concluída
- Fundo: rgba(sucesso, 0.15)
- Texto: sucesso
- Borda: 1px solid sucesso

#### Disponível
- Fundo: rgba(informação, 0.15)
- Texto: informação
- Borda: 1px solid informação

#### Desclassificada
- Fundo: rgba(erro, 0.15)
- Texto: erro
- Borda: 1px solid erro

#### Bloqueada
- Fundo: rgba(aviso, 0.15)
- Texto: aviso
- Borda: 1px solid aviso

#### Padronização
- Border-radius: 6px
- Padding: 4px 12px
- Font-size: 12px
- Peso: 600
- Altura: 24px mínimo

### Alertas e Toasts
#### Banner (ocupar topo/fundo)
- Padding: lg (16px)
- Border-radius: 8px
- Display: flex, gap md
- Font-size: 14px
- Peso: 500

#### Ícone
- Tamanho: 20px
- Margin-right: md

#### Dismissable
- Botão X à direita
- Onclick: remover banner instantaneamente

#### Variações
- Erro: fundo rgba(erro, 0.15), borda esquerda 4px solid erro
- Sucesso: fundo rgba(sucesso, 0.15), borda esquerda 4px solid sucesso
- Atenção: fundo rgba(aviso, 0.15), borda esquerda 4px solid aviso
- Info: fundo rgba(informação, 0.15), borda esquerda 4px solid informação

### Modais/Diálogos
#### Container
- Fundo: superfícies elevadas
- Border-radius: 12px
- Padding: xxl (32px) em telas maiores, lg (16px) em mobile
- Box-shadow (neumorfismo): 0 20px 40px rgba(0,0,0,0.2)
- Max-width: 500px para diálogos padrão, 800px para formulários

#### Cabeçalho
- Font-size: H3
- Peso: 700
- Margin-bottom: lg (16px)
- Padding-bottom: md (12px)
- Borda-bottom: 1px solid borda

#### Corpo
- Font-size: body regular
- Line-height: 1.6
- Margin-bottom: xl (24px)

#### Footer com botões
- Display: flex
- Gap: md (12px)
- Margin-top: xl (24px)
- Justify-content: flex-end em desktop, stretch em mobile

### Tabelas
#### Headers
- Fundo: fundo secundário
- Texto: texto primário, peso 600
- Padding: md (12px)
- Border-bottom: 1px solid borda
- Font-size: 12px

#### Linhas
- Padding: md (12px)
- Border-bottom: 1px solid borda
- Background: superfícies elevadas

#### Hover (linhas)
- Fundo: rgba(informação, 0.05)
- Mudança instantânea

#### Células com ação
- Cursor: pointer
- Exibir ícone ou indicador visual

### Skeletons (Carregamento)
#### Padrão
- Fundo: fundo secundário
- Border-radius: 4px
- Altura: relativa ao componente que substitui
- Sem animação: estado estático

#### Exemplos
- Texto: altura 14px, width 100%
- Avatar: altura 40px, width 40px, border-radius 50%
- Card: altura 200px, width 100%

## Layouts

### Grid/Spacing geral
- Desktop: 1440px max-width, padding 48px (xxxl) lateral
- Tablet: 768px max-width, padding 24px (xl) lateral
- Mobile: 100vw, padding 12px (md) lateral

### Header
- Altura: 64px
- Fundo: superfícies elevadas
- Borda-bottom: 1px solid borda
- Display: flex, justify-content space-between, align-items center
- Padding: 0 lg (16px)
- Position: sticky top 0, z-index 1000

### Sidebar/Navegação (se houver)
- Largura: 240px em desktop, drawer em mobile
- Background: fundo secundário
- Padding: lg (16px)
- Menu items: padding md (12px), border-radius 6px, hover background fundo primário

### Cards em Grid
- Desktop: 3 colunas (repeat(auto-fit, minmax(280px, 1fr)))
- Tablet: 2 colunas
- Mobile: 1 coluna
- Gap: xl (24px)

## Acessibilidade

### Contraste
- Texto primário sobre fundo primário: mínimo 7:1 (AAA)
- Texto secundário: mínimo 4.5:1 (AA)

### Foco
- Outline: 2px solid cor informação
- Outline-offset: 2px
- Visível em todos os elementos interativos

## Ícones
- Tamanho padrão: 20px (regular), 24px (large)
- Stroke-width: 2px
- Cor: herdar cor do elemento pai
- Fonte recomendada: Feather Icons ou Material Icons

## Transições e Animações
- Regra geral: não usar transições animadas.
- Apenas transições obrigatórias de estado/feedback.
- Toda transição obrigatória deve ser instantânea (0ms), sem easing.
- Evitar: animações de scroll, fade, escalonamento e efeitos decorativos.

### Casos permitidos
- Mudança de estado de botão (normal, hover, ativo, desabilitado, carregando): instantânea.
- Exibição/ocultação de mensagens de erro, sucesso e alerta: instantânea.
- Abertura/fechamento de modal apenas quando necessário para usabilidade: instantânea.

## Modo Escuro (futuro)
Inverter tema com cuidado:
- Base: fundo primário solarizado vira #0B2635 (cinza muito escuro)
- Texto primário vira #FDF6E3
- Manter acentos
- Usar preferência do SO (prefers-color-scheme)
