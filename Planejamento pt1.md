# Plataforma Educacional — Parte 1


## Objetivo


Criar uma plataforma educacional web chamada **Oficinando**, com login Google (Firebase), avaliações para alunos, painel de professor e controle de tentativas/resultados.


---


## Restrições Técnicas


- Autenticação exclusivamente via Google Auth (Firebase).
- Backend utilizando Firestore (Firebase).
- Projeto compatível com GitHub Pages.


---


## Autenticação e Perfil


- Login e logout com Google.
- Perfil de aluno ou professor armazenado no Firestore.
- O papel de professor é disponível apenas para contas explicitamente listadas em um registro de autorização no Firestore, configurado pela plataforma.
- A troca de papel é permitida somente para usuários autorizados como professor.


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


---


## Home


- Lista de questionários exibidos em cards.
- Campo de pesquisa de avaliação por nome.
- Header com título do site ("Oficinando") e botões de navegação.


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
- Chip no canto superior direito com status: **Concluída**, **Disponível** ou **Violada**


### Card — Aluno (avaliação não realizada)
- Botão: **Abrir**


### Card — Aluno (avaliação já realizada)
- Botão: **Ver detalhes** (redireciona para a tela de iniciar questionário)
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


### Editar avaliação
- Gerenciar visualização de turmas


Editar questão
padrão de 4 alternativas
aceita anexar imagem


---


### Criador de avaliação
- Criar com IA
- preencher título, descrição da avaliação
- modo de alternativas (ocultas ao clicar/sempre visível, o padrão é ocultas)


### Criar com IA
- Utilizando chave api do gemini
- Campo do prompt
- Dificuldade
- Prompt negativo
- Área de conhecimento
- Nível de ensino


---


### Funcionamento do questionário
- há três botões por padrão quando o usuário está olhando para a questão




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
> - Você pode pular uma questão para responder depois (até 3 vezes por tentativa).
> - As questões e alternativas são embaralhadas.
> - Não recarregue a página e não troque de tela; isso bloqueia a avaliação.
> - Ao bloquear o quiz, você perde o acesso à tentativa.


### Avaliação já realizada
- Título e descrição da avaliação
- Nome do aluno
- Horário de início e término, data de conclusão
- Duração da avaliação
- Resumo da tentativa: acertos / total de questões
- Status da avaliação: **Concluída**, **Bloqueada por violação** ou **Bloqueada por inatividade**
  - Se bloqueada: informar o motivo (ex.: não retornou em 10 segundos, fechou o navegador, saiu da avaliação, etc.)
- Botão **Refazer** (exibido somente se houver tentativas restantes)
- Botão **Ver Resumo**