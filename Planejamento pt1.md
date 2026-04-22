# Plataforma Educacional — Parte 1

### Sumário
- [Objetivo](#objetivo)
- [Restrições Técnicas](#restrições-técnicas)
- [Autenticação e Perfil](#autenticacao-e-perfil)
- [Primeiro Login](#primeiro-login)
- [Base de Dados (Firestore)](#base-de-dados-firestore)
- [Home](#home)
- [Header](#header)
- [Card de Avaliação](#card-de-avaliacao)
- [Criador de avaliação](#criador-de-avaliacao)
- [Editor de Nanograma](#editor-de-nanograma)
- [Nanograma (Minijogo)](#nanograma-minijogo)
- [Sistema de Monitoramento e Bloqueio](#sistema-de-monitoramento-e-bloqueio)
- [Usuário respondendo avaliação](#usuario-respondendo-avaliacao)
- [Tela de Iniciar Questionário](#tela-de-iniciar-questionario)
- [Tela de ver detalhes](#tela-de-ver-detalhes-avaliacao-ja-realizada)
- [Tela de Resumo](#tela-de-resumo)

### para construir
- Resultados (Professor)
- Turmas (Professor)
- Configurações (Professor)
- Banco de Questões (Professor)

## Objetivo
Criar uma plataforma educacional web chamada **Oficinando**, com login Google (Firebase), avaliações para alunos, painel de professor e controle de tentativas/resultados.


---


## Restrições Técnicas
- Autenticação exclusivamente via Google Auth (Firebase).
- Backend utilizando Firestore (Firebase).
- Projeto compatível com GitHub Pages.
- O firebase não deve ser muito consumido, deve ter utilização econômica, tomar cuidado com muitas leituras ou registros.


---


## Autenticação e Perfil
- Login e logout com Google.
- Perfil de aluno ou professor armazenado no Firestore.
- O papel de professor é disponível apenas para contas explicitamente listadas em um registro de autorização no Firestore, configurado pela plataforma.
- A troca de papel é permitida somente para usuários autorizados como professor.

---

## Estilo de design
Estilo deve ser constrído de maneira editável para poder alterar posteriormente
Tipografia neutra estilo internacional com aspecto tátil
Alinhamento bem organizado
Efeitos neumorfistas
glassmorfismo quando necessário
Não deve ter animações suaves
não deve ser minimalista

Tema padrão de cores é o solarizado: tonalidades de branco queimado/off white
o usuário pode mudar para o padrão de cor normal com tons de cinza

---


## Primeiro Login
- O aluno preenche nome e sobrenome e escolha da turma.
- Nome pode ser alterado uma vez por dia.
- Turma pode ser alterada uma vez por dia.
- Após o primeiro login, o usuário é redirecionado para a home com a lista de questionários disponíveis.


---


## Base de Dados (Firestore)
Coleções necessárias:
- Avaliações
- Usuários
- Notas dos usuários
- Turmas
- Professores
- Alunos
- Configurações da plataforma
- Histórico de atividades (opcional, para monitoramento e análise de uso)


---

## Home

### Home aluno
- Header com título do site ("Oficinando") e botões de navegação.
- Campo de pesquisa de avaliação por nome.
- Lista de avaliações disponíveis, exibidas em cards.

### Home professor
- Header com título do site ("Oficinando") e botões de navegação.
- Campo de pesquisa de avaliação por nome.
- Filtro de avaliações por turma (caso haja avaliação sem turma, o sistema deve exibir um aviso ou permitir a filtragem por "Sem Turma" e haver também opção de todas as turmas).
- Lista de todas as avaliações da turma selecionada, exibidas em card.

---

## Header

### Header — Aluno
- Nome/Turma (ao clicar, permite gerenciar nome e turma)
- Botão Home
- Botão Sair


### Header — Professor
- Nome/Turma (ao clicar, permite gerenciar nome e turma)
- Botão Home
- Botão Resultados
- Botão Turmas
- Botão Criador de Avaliações
- Botão Editor de Nanograma
- Botão Sair


---


## Card de Avaliação

### Anatomia do Card
Composto por:
- Título da avaliação
- Descrição da avaliação
- Número de questões
- Número de tentativas permitidas
- Botões de ação
- Chip no canto superior direito com status: **Concluída**, **Disponível**, **Violada** ou **Bloqueada**.

### Card — Aluno (avaliação não realizada)
- Botão: **Abrir**

### Card — Aluno (avaliação já realizada)
- Botão: **Ver detalhes**
- Botão: **Resumo** (resumo detalhado das questões)

### Card — Professor
Não exibe chip de status.
Botões disponíveis:
- Abrir
- Liberar/Bloquear início
- Liberar/Bloquear resumo
- Liberar/Ativar modo de espera
- Editar
- Excluir

---


## Criador de avaliação

### Ordem dos campos
- Configurações gerais da avaliação
- Criar com IA
- Configuração individual por questão
- Campo para adicionar nova questão
- Gerenciar visualização de turmas
- Prazo de entrega (opcional)
- Programar liberação automática (opcional)
- Visibilidade de visualização (público/privado)

### Configurações gerais da avaliação
- preencher título, descrição da avaliação
- modo de alternativas (ocultas ao clicar/sempre visível, o padrão é ocultas)
- Opção de embaralhar (não/questões e alternativas/alternativas/questões) [o padrão é "questões e alternativas"].
- habilitar opção de pular questão (ativada por padrão) para pular a questão e mandar ela para o final padrão de 3 vezes.
- gerenciar quais turmas vão visualizar a avaliação.
- Quantidade de tentativas permitidas (padrão uma)
- Tempo limite total da avaliação (opcional, padrão desativado)
- Habilitar modo de espera (impede o início até que o professor libere manualmente, padrão desativado)
- Habilitar visualização de resumo após conclusão (padrão desativado)
- Ordem fixa ou aleatória das alternativas (padrão aleatória)


### Criar com IA

- Integração com a API do Gemini, utilizando chave fornecida exclusivamente por variável de ambiente ou serviço seguro de gerenciamento de segredos (nunca expor a chave no código, arquivos versionados ou no cliente).
- Campos configuráveis:
  - Prompt principal (orientação para geração das questões)
  - Prompt negativo (o que evitar nas questões)
  - Dificuldade
  - Área de conhecimento
  - Nível de ensino
  - Quantidade de questões a serem geradas
  - Quantidade de texto para cada questão (enunciado, alternativas, explicação)
- Botão **Gerar questões**
- Visualização prévia das questões geradas, permitindo edição individual antes de salvar.
- Botão **Validar e salvar** (salva apenas após revisão do professor)
- As configurações e prompts utilizados devem ser salvos junto à avaliação e reaparecer ao editar.
- Histórico de prompts e resultados anteriores acessível ao professor para facilitar ajustes e reuso.
- Indicar claramente que a geração automática é apenas um auxílio e requer revisão humana.

### Configuração individual por questão
- Enunciado da questão (suporta Markdown).
- Upload de imagem opcional (armazenada no Firebase Storage).
- 4 alternativas de múltipla escolha (sendo possível adicionar mais ou subtrair alternativas).
- Definição da alternativa correta.
- Peso da questão (pontuação, padrão 1).
- Explicação da resposta (exibida apenas no resumo pós-conclusão).
- Tempo limite individual por questão (opcional, padrão desativado).

Obs.: futuramente quero implementar outros tipos de questões além da múltipla escolha.

---

## Editor de Nanograma
- Interface para criar e editar nanogramas (desenho com quadrados).
- Definição de dimensões (largura x altura).
- Ferramenta de preenchimento de células (clique para pintar, clique com botão direito ou modificador para marcar como vazio/X).
- Geração automática das dicas numéricas (clues) laterais e superiores com base no desenho.
- Opção de salvar o nanograma.
- Deve ser possível escolher cores.

---

## Nanograma (Minijogo)

### Funcionamento do Jogo
- O nanograma é um quebra-cabeça lógico onde células de uma grade devem ser preenchidas ou deixadas em branco de acordo com números na lateral da grade para revelar um desenho oculto.
- Interface de jogo com feedback visual imediato ao completar linhas ou colunas corretamente.
- Botão de "Check" para validar a solução.
- Ao completar, o desenho é revelado em cores (se definido) e o tempo é registrado no histórico.
- Placar da turma quem completou antes.
- o jogo é habilitado depois que o usuário completa uma avaliação. Pode ser acessado clicando no botão jogar nanograma na tela de ver detalhes que aparece automaticamente após o término da avaliação.


---

## Sistema de Monitoramento e Bloqueio

### Detecção de Fraude (Anti-Cheat)
- Monitoramento de visibilidade da página (`visibilitychange`): se o usuário trocar de aba ou minimizar o navegador, um aviso é exibido.
- Se o usuário sair da tela por mais de 10 segundos, a avaliação é automaticamente bloqueada e marcada como **Violada**.
- Bloqueio de teclas de atalho (F12, Ctrl+Shift+I, Ctrl+U) e clique direito para dificultar inspeção do código.
- Detecção de redimensionamento de janela para evitar divisão de tela.

### Registro de Eventos (Logs)
- Cada ação crítica (início, troca de aba, conclusão, tentativa de fraude) é registrada no Firestore com timestamp para auditoria do professor.

---

## Usuário respondendo avaliação

### Organização e aparência
- Tela cheia obrigatória
- Um bloco centralizado na tela com os elementos: enunciado da questão, tempo se houver, imagem se houver, alternativas, botões de ação.
- O usuário não consegue aumentar ou diminuir o zoom, isso não é permitido.

### Funcionamento do questionário
- há três botões por padrão quando o usuário está olhando para a questão: pular, limpar (desmarcar alternativa) e próxima questão.
- botão próxima vira finalizar quando estiver na útima questão.
- o botão próxima questão deve estar esmaecido e inclicável até o usuário escolher uma alternativa.
- o botão limpar desmarca a alternativa escolhida.
- a alternativa escolhida não deve ser desmarcada ao ser clicada novamente.
- o usuário não precisa apertar no botão limpar para poder marcar outra alternativa.
- quando a avaliação termina o usuário é encaminhado à tela ver detalhes que tem as informações

### Comportamento do modo oculto ao clicar
- Modo de alternativas ocultas ao clicar funciona assim: quando o usuário clica em uma alternativa o texto delas some, inclusive sem a possibilidade de ver quando tenta selecionar texto.
- A visualização oculta é representada por um retângulo com tamanho aleatório ao invés do texto. O tamanho é aleatório mas ele acompanha a média de tamanho das alternativas, ou seja, se as alternativas tiverem duas linhas de tamanho, haverá dois retângulos.
- ao passar o mouse por cima de uma alternativa oculta ela é revelada enquanto o mouse estiver em cima exceto da alternativa marcada.

### Comportamento no modo questões com tempo 
- o tempo fica abaixo do enunciado em contagem regressiva
- se o tempo chegar a zero a alternativa marcada é registrada, se não estiver marcada nenhuma alternativa é registrada, o sistema abre uma mensagem de aviso que vai passar para a próxima questão em 10 segundos se o usuário não interromper e passar logo.

### Violações
- Se o usuário tentar burlar o sistema (sair do foco, sair da tela cheia, trocar de aba, minimizar, usar atalhos proibidos), aparecerá um aviso interno do site (não o genérico do navegador) informando ele tem 10 segundos para retornar à página ou a avaliação será automaticamente encerrada e marcada como violada.
- A avaliação será encerrada instantaneamente se o usuário fechar o navegador ou sair da avaliação.
- Se a avaliação for marcada como violada, o usuário é impedido de continuar e redirecionado para a tela de detalhes com o status correspondente.
- O professor tem o poder de resetar uma violação manualmente na tela de resultados caso considere a justificativa do aluno válida.

---

## Tela de Iniciar Questionário

### Avaliação ainda não realizada
- Título e descrição da avaliação
- Nome do aluno
- Duração estimada, total de questões, tentativas permitidas/usadas
- Destaque para tempo por questão (se aplicável)
- Regras e orientações (ver texto abaixo)
- Botão **Iniciar Avaliação**
  - Se a avaliação não estiver liberada pelo professor: botão esmaecido; ao passar o mouse, o texto muda para **"Atualizar"**, permitindo verificar se o professor já liberou.


### Texto das Regras e Orientações
> **Regras e orientações**
>
> - Não é possível voltar para questões anteriores.
> - Você pode pular uma questão para responder no final (até 3 vezes por tentativa).
> - As questões e alternativas são embaralhadas.
> - Não recarregue a página e não troque de tela; isso bloqueia a avaliação.
> - Ao bloquear o quiz, você perde o acesso à tentativa.



## Tela de ver detalhes (avaliação já realizada)
- Título e descrição da avaliação
- Nome do aluno
- Horário de início e término, data de conclusão
- Duração da avaliação
- Resumo da tentativa: acertos / total de questões
- Status da avaliação: **Concluída**, **Bloqueada por violação** ou **Bloqueada por inatividade**
  - Se bloqueada: informar o motivo (ex.: não retornou em 10 segundos, fechou o navegador, saiu da avaliação, etc.)
- Botão **Refazer** (exibido somente se houver tentativas restantes)
- Botão **Ver Resumo**
- botão **Jogar Nanograma**

### Tela de ver detalhes com avaliação bloqueada
- Exibe o motivo do bloqueio (ex.: "Avaliação bloqueada por violação: você saiu da tela por mais de 10 segundos").

### Tela de ver detalhes com avaliação bloqueada mas liberada para nova tentativa
- 

### Tela de ver detalhes com avaliação concluída mas liberada para nova tentativa
- 

---

## Tela de Resumo
- Exibe pontuação
- Exibe tempo total gasto
- Filtro para visualizar apenas questões incorretas
- Botão para voltar à tela de detalhes
- Exibe cada questão com:
- Enunciado
- Imagem (se houver)
- Alternativas, destacando a correta e a escolhida pelo aluno
- Explicação da resposta (se fornecida pelo professor)
- status da questão (acertada, errada ou em branco)

---

## Tela de resultados do professor
- Lista de alunos com suas respectivas avaliações, pontuações, status e tempo gasto.
- Opção de filtrar por turma e avaliação.

### Colunas da tabela de alunos
- Nome do aluno
- Pontuação nota/nota possível
- Status da avaliação (Concluída, Violada, Bloqueada)
  - descrição da violação caso haja
- Data
 - Data, hora de início e término e tempo gasto

- Ação
  - Botão detalhes
    - tentativas restantes
    - registro de atividaes/tentativas
    - Data, hora de início e término e tempo gasto
  - botão de liberar nova tentativa independente se a avaliação foi violada ou não.
    - isso não remove o registro de atividades
    - libera um botão iniciar avaliação na tela de ver detalhes.
  - botão para visualizar o **resumo** do usuário
  - botão para bloquear manualmente, o que bloqueia a avaliação.