# Especificação Funcional - Produto e Fluxos

## Objetivo
Criar a plataforma educacional web Oficinando, com autenticação Google (Firebase), aplicação de avaliações para alunos, painel de professor e controle de tentativas, status e resultados.

## Restrições técnicas
- Frontend: Vue 3 com Vite.
- Autenticação via Google Auth (Firebase Authentication).
- Backend em Firebase (Firestore e Storage).
- Projeto compatível com GitHub Pages.
- Uso econômico do Firebase: reduzir leituras e escritas redundantes, evitar polling constante, usar cache local quando possível.

## Terminologia oficial
Padronização de termos para evitar ambiguidade na implementação.

- Avaliação: conjunto de questões criado pelo professor.
- Tentativa: execução única da avaliação por aluno.
- Concluída: tentativa finalizada normalmente.
- Desclassificada: tentativa encerrada por violação das regras de aplicação.
- Bloqueada: avaliação indisponível para iniciar (controle do professor).
- Infração de permanência: evento de saída indevida durante permanência obrigatória, sem alterar nota por si só.
- Resumo: tela com questão a questão, resposta correta, resposta marcada e explicação.
- Detalhes: tela da tentativa com metadados (início, fim, duração, status e ações).

## Regras globais de interface (consolidado)
Estas regras substituem repetições em múltiplas telas.

- Botão indisponível deve ficar desabilitado visualmente e funcionalmente.
- Quando houver ação de revalidar disponibilidade (exemplo: resumo ainda não liberado), usar CTA "Atualizar status".
- Toda ação assíncrona deve exibir estado de carregamento (spinner/skeleton) e mensagem de erro contextual em caso de falha.
- Mensagens de erro devem ter ação de "Tentar novamente".
- O sistema deve evitar animações suaves longas; priorizar transições instantâneas.

## Autenticação e perfil
- Login e logout com Google.
- Perfil de aluno ou professor armazenado no Firestore.
- Papel de professor permitido apenas para contas autorizadas em coleção específica.
- Troca para papel de professor somente para usuário autorizado.

## Primeiro login
- Aluno preenche nome, sobrenome e turma.
- Nome pode ser alterado uma vez por dia.
- Turma pode ser alterada uma vez por dia.
- Após primeiro login, redirecionar para Home.

## Home
### Home aluno
- Header com nome da plataforma e navegação.
- Campo de pesquisa de avaliação por nome ou palavra relacionada.
- Lista de avaliações disponíveis em cards.

### Home professor
- Header com nome da plataforma e navegação.
- Campo de pesquisa de avaliação por nome ou palavra relacionada.
- Filtro por turma, com opções "Todas" e "Sem turma".
- Lista de avaliações da turma selecionada em cards.

## Header
### Header aluno
- Nome e turma (abrir gestão de perfil)
- Botão Home
- Botão Sair
- Nanograma (minijogo)

### Header professor
- Nome e turma (abrir gestão de perfil)
- Botão Home
- Botão Resultados
- Botão Turmas
- Botão Criador de avaliações
- Botão Editor de nanograma
- Nanograma (minijogo)
- Configurações
- Botão Sair

## Card de avaliação
### Anatomia
- Título
- Chip de status (aluno): Concluída, Disponível, Desclassificada, Bloqueada
- Descrição
- Número de questões
- Número de tentativas permitidas
- Ações

### Aluno (não realizada)
- Botão Abrir

### Aluno (já realizada)
- Botão Ver detalhes

### Professor
- Sem chip de status de aluno
- Ações:
  - Abrir
  - Liberar/Bloquear início
  - Liberar/Bloquear resumo
  - Ativar/Desativar permanência obrigatória
  - Editar
  - Excluir (com confirmação por digitação da palavra "excluir")

## Criador de avaliação
### Ordem dos campos
- Configurações gerais
- Criar com IA
- Configuração por questão
- Adicionar nova questão
- Gerenciar visibilidade por turma
- Prazo de entrega (opcional)
- Programar liberação automática (opcional)
- Visibilidade pública/privada
- Escolher cor da avaliação

### Configurações gerais
- Título e descrição
- Modo de alternativas (ocultas ao clicar/sempre visível), padrão ocultas
- Embaralhamento (não/questões e alternativas/alternativas/questões), padrão questões e alternativas
- Permitir pular questão (padrão ativo), limite padrão 3 por tentativa
- Turmas que visualizam a avaliação
- Tentativas permitidas (padrão 1)
- Tempo limite total (opcional)
- Permanência obrigatória (padrão desativado)
- Liberação de resumo após conclusão (padrão desativado)
- Ordem fixa ou aleatória de alternativas (padrão aleatória)
- Opções neutras e suaves de cores (aleatório por padrão)

### Criar com IA _(pós-v1)_
- Integração com API Gemini via chave pessoal do professor.
- Campos:
  - Prompt principal
  - Prompt negativo
  - Dificuldade
  - Área de conhecimento
  - Nível de ensino
  - Quantidade de questões
  - Tamanho de texto por questão
- Botão Gerar questões
- Pré-visualização com edição antes de salvar
- Botão Validar e salvar
- Salvar configurações de geração junto da avaliação
- Histórico de prompts e resultados para reuso
- Aviso obrigatório: geração automática exige revisão humana
- Política de privacidade obrigatória no fluxo:
  - Não enviar dados pessoais de alunos em prompts.
  - Exibir aviso antes da geração sobre uso de serviço externo.
  - Registrar metadados de geração (sem conteúdo sensível) para auditoria.

### Configuração por questão
- Enunciado (suporte Markdown)
- Upload de imagem opcional (Storage)
- Alternativas editáveis
- Definição de alternativa correta
- Peso da questão (padrão 1)
- Explicação da resposta (exibida no resumo)
- Tempo individual por questão (opcional)

Observação: futuramente suportar outros tipos de questão além de múltipla escolha.

## Nanograma (minijogo)
### Funcionamento
- Minijogo lógico independente da avaliação.
- Botão para validar solução.
- Aluno escolhe um nanograma dentre a lista mostrada.

### Placar
- O primeiro lugar deve ser de quem fez mais nanogramas.
- O placar deve ser uma lista de nomes com a quantidade de nanogramas realizados.

### Acesso
- Botão Jogar nanograma após concluir avaliação.
- Botão no header do aluno.

### Editor de nanograma (professor)
- Criar e editar nanogramas
- Definir dimensões (largura x altura)
- Preenchimento de células
- Gerar dicas numéricas automaticamente
- Salvar nanograma
- Suporte a cores
- Definir nome
- Lista de nanogramas criados com opção para editar ou excluir

### Editor de nanograma - aluno _(pós-v1)_
- Caso o aluno gabarite a avaliação, ele tem uma chance de criar um nanograma para fazer parte da lista de nanogramas criados.
- A opção de criar nanograma do aluno fica habilitada na área do game.
- Por padrão, os alunos que não têm esse recurso podem ver o botão de criar nanograma mas com 0 de créditos.
- O nanograma criado deve ser aprovado pelo professor antes de poder ser acessado pelos usuários.
- Nanogramas criados por alunos informam a autoria.

## Usuário respondendo avaliação
### Layout e comportamento
- Modo de prova com foco em tela cheia.
- Bloco central com enunciado, tempo (se houver), imagem, alternativas e ações.
- Botões padrão: Pular, Limpar, Próxima (Finalizar na última).
- Próxima desabilitado até selecionar alternativa.
- Limpar remove alternativa marcada.
- Clicar na alternativa marcada não desmarca automaticamente.
- Troca direta de alternativa permitida sem usar Limpar.
- Ao finalizar, redirecionar para Detalhes.

### Modo oculto ao clicar
- Ao selecionar alternativa, ocultar textos das alternativas conforme configuração.
- Exibir retângulos de placeholder proporcionais ao tamanho médio das alternativas.
- Hover revela alternativa oculta, exceto a alternativa marcada.

### Questões com tempo
- Contador regressivo abaixo do enunciado.
- Ao zerar, registrar resposta marcada (ou em branco).
- Exibir aviso com transição automática para próxima questão em 10 segundos, com opção de avançar antes.

## Tela iniciar questionário (avaliação não realizada)
- Título e descrição
- Nome do aluno
- Duração estimada, total de questões, tentativas permitidas/usadas
- Destaque de tempo por questão (se houver)
- Regras e orientações
- Botão Iniciar avaliação
- Data de liberação caso houver programação de liberação automática.
- Data de entrega caso houver.
- Tempo limite se houver.

### Regras e orientações (texto)
- Não é possível voltar para questões anteriores.
- É possível pular questão até o limite da tentativa.
- Questões/alternativas podem ser embaralhadas.
- Não recarregar página nem trocar de tela durante a prova.
- Violação pode gerar desclassificação da tentativa.

## Tela ver detalhes (avaliação realizada)
- Título e descrição
- Nome do aluno
- Horário de início e término
- Duração
- Acertos/total
- Status da tentativa: Concluída ou Desclassificada
- Motivo da desclassificação (quando houver)
- Sinalização de infração de permanência (quando houver)
- Botão Refazer (se houver tentativa liberada)
- Botão Ver resumo
- Botão Jogar nanograma

### Regras de botões
- Refazer fica indisponível sem tentativa liberada.
- Ver resumo fica indisponível sem liberação de resumo.
- Quando indisponível com regra de revalidação, usar ação "Atualizar status".

## Tela resumo
- Pontuação
- Tempo total
- Filtro de questões incorretas
- Lista por questão com enunciado, imagem, alternativas, correta, marcada e explicação
- Status por questão: acertada, errada, em branco

## Tela resultados do professor
- Filtros por turma e avaliação.
- Lista de alunos com avaliação, pontuação, status e tempo.
- Ações por aluno:
  - Ver detalhes
  - Liberar nova tentativa
  - Ver resumo
  - Bloquear/Desbloquear avaliação
  - Remover desclassificação com justificativa

### Desempenho da turma
- Gráfico de distribuição de notas.
- Média, mediana e desvio padrão da turma.
- Resumo de cada questão mostrando a porcentagem de acertos e erros, e as alternativas mais escolhidas.

### Exportação de Dados _(pós-v1)_
- Botão para exportar resultados da turma/avaliação em formato CSV ou Excel.
- Relatório individual em PDF para impressão ou arquivamento.

## Estados de carregamento e erro
Padrão mínimo para todas as telas de dados.

### Carregamento
- Lista: skeleton dos cards/tabela.
- Tela de detalhe: placeholders dos blocos principais.
- Botões de ação: estado carregando com bloqueio de duplo clique.

### Erro
- Erro de leitura: banner com mensagem amigável + botão "Tentar novamente".
- Erro de escrita: toast/banner com motivo resumido + opção "Repetir ação".
- Erro de permissão: mensagem sem stack técnico para usuário final, com orientação de contato ao professor/admin.

## Turmas (Professor)
- Criar, editar e excluir turmas.
- Visualizar lista de alunos por turma.
- Atribuir alunos a turmas.
- Gerar código de convite ou link para entrada de alunos na turma.
- Opção de remover ou transferir de turma.

## Configurações (apenas Admin)
- Gerenciar lista de professores autorizados (apenas Admin).
- Ajustar parâmetros globais.
- Ativar/desativar banner de manutenção.
- Personalizar temas e identidade visual básica da plataforma.

## Banco de questões (Professor) _(pós-v1)_
- Repositório central de questões para reaproveitamento em diferentes avaliações.
- Busca por tags, área de conhecimento ou dificuldade.
- Importação e exportação de questões.
- Duplicação de questões existentes para edição.

## Pendências de implementação
- Outros tipos de questão além de múltipla escolha.
