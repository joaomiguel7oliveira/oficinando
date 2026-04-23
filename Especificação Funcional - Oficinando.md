# Plataforma Educacional - Parte 1

## Sumário
- Objetivo
- Restrições técnicas
- Terminologia oficial
- Escopo funcional
- Regras globais de interface (consolidado)
- Matriz de status e precedência
- Autenticação e perfil
- Primeiro login
- Home
- Header
- Card de avaliação
- Criador de avaliação
- Editor de nanograma
- Nanograma (minijogo)
- Sistema de monitoramento e desclassificação (anti-cheat viável)
- Usuário respondendo avaliação
- Permanência obrigatória
- Tela iniciar questionário
- Tela ver detalhes
- Tela resumo
- Tela resultados do professor
- Estados de carregamento e erro
- Falha de conexão do aluno
- Turmas
- Configurações
- Banco de questões
- Pendências de implementação

## Objetivo
Criar a plataforma educacional web Oficinando, com autenticação Google (Firebase), aplicação de avaliações para alunos, painel de professor e controle de tentativas, status e resultados.

## Restrições técnicas
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

## Escopo funcional
### Em construção
- Resultados (Professor)
- Turmas (Professor)
- Configurações (Professor)
- Banco de questões (Professor)

## Regras globais de interface (consolidado)
Estas regras substituem repetições em múltiplas telas.

- Botão indisponível deve ficar desabilitado visualmente e funcionalmente.
- Quando houver ação de revalidar disponibilidade (exemplo: resumo ainda não liberado), usar CTA "Atualizar status".
- Toda ação assíncrona deve exibir estado de carregamento (spinner/skeleton) e mensagem de erro contextual em caso de falha.
- Mensagens de erro devem ter ação de "Tentar novamente".
- O sistema deve evitar animações suaves longas; priorizar transições instantâneas.

## Matriz de status e precedência
Regra única para resolver conflitos de estado da tentativa.

### Status principais da tentativa
- Em andamento
- Concluída
- Desclassificada

### Status de disponibilidade da avaliação
- Liberada
- Bloqueada

### Precedência (maior para menor)
1. Desclassificada
2. Concluída
3. Em andamento

### Regras de negócio
- Se houver evento de desclassificação válido durante uma tentativa, o status final da tentativa será Desclassificada.
- Bloqueada é um estado da avaliação (disponibilidade), não substitui o status histórico da tentativa.
- Infração de permanência obrigatória gera flag de conduta, sem alterar automaticamente a nota e sem converter Concluída para Desclassificada.
- Professor pode liberar nova tentativa sem apagar histórico anterior.
- Professor pode remover marca de desclassificação manualmente apenas com justificativa registrada em log.

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

### Criar com IA
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

### Editor de nanograma - aluno
- Caso o aluno gabarite a avaliação, ele tem uma chance de criar um nanograma para fazer parte da lista de nanogramas criados.
- A opção de criar nanograma do aluno fica habilitada na área do game.
- Por padrão, os alunos que não têm esse recurso podem ver o botão de criar nanograma mas com 0 de créditos.
- O nanograma criado deve ser aprovado pelo professor antes de poder ser acessado pelos usuários.
- Nanogramas criados por alunos informam a autoria.

## Sistema de monitoramento e desclassificação (anti-cheat viável)
Importante: navegador não garante bloqueio absoluto de atalhos, devtools, zoom ou troca de aba. O sistema deve monitorar eventos e aplicar desclassificação conforme regra.

### Eventos monitorados
- visibilitychange (aba oculta/minimizada)
- blur/focus de janela
- saída de tela de aplicação em modo de prova
- tentativa de fechar/sair da avaliação
- perda de fullscreen quando fullscreen for exigido

### Regra de desclassificação
- Ao detectar saída de foco/aba, iniciar contador de 10 segundos visível ao aluno.
- Se o aluno não retornar no prazo, encerrar tentativa como Desclassificada.
- Fechar navegador ou abandonar rota de prova encerra tentativa como Desclassificada.
- Atalhos proibidos, clique direito e tentativa de abrir ferramentas de inspeção devem ser tratados como eventos de risco monitorados.
- Esses eventos não podem ser vendidos como bloqueio garantido no navegador; devem servir para auditoria e decisão pedagógica.

### Registro de eventos
- Registrar início, conclusão, desclassificação, retorno ao foco e eventos críticos com timestamp.
- Manter trilha para auditoria do professor.

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

## Permanência obrigatória
- Impede saída do ambiente da plataforma após concluir avaliação, até liberação do professor.
- Aluno pode acessar partes permitidas internamente (exemplo: minijogo).

### Infração de permanência
- Se o aluno sair do ambiente durante permanência obrigatória, registrar Infração de permanência.
- A infração não altera nota automaticamente.
- Professor visualiza a infração na tela de detalhes e resultados.
- A infração não é uma informação importante então não precisa aparecer em destaque.

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

### Exportação de Dados
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

## Falha de conexão do aluno
Fluxo obrigatório durante prova.

- Detectar offline com eventos do navegador (online/offline) e timeout de requisições.
- Ao detectar queda:
  - pausar envio de eventos não críticos em fila local;
  - exibir banner persistente "Sem conexão. Tentando reconectar.";
  - manter resposta local temporária (memória/sessão) para evitar perda imediata.
- Ao reconectar:
  - sincronizar fila em ordem cronológica;
  - confirmar persistência no backend;
  - remover banner de offline.
- Se a reconexão não ocorrer no tempo limite de segurança da prova (definir em configuração), encerrar tentativa como Desclassificada por indisponibilidade de conexão, registrando motivo e tempo de indisponibilidade.
- Toda desclassificação por conexão deve ficar explícita para revisão do professor, com possibilidade de liberar nova tentativa.

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

## Banco de questões (Professor)
- Repositório central de questões para reaproveitamento em diferentes avaliações.
- Busca por tags, área de conhecimento ou dificuldade.
- Importação e exportação de questões.
- Duplicação de questões existentes para edição.

## Critérios de aceite (fluxos críticos)

### CA-01 - Desclassificação por perda de foco
- Dado uma tentativa com status Em andamento
- Quando o aluno permanecer fora de foco por mais de 10 segundos
- Então a tentativa deve ser encerrada como Desclassificada e deve existir registro do evento de desclassificação com timestamp.

### CA-02 - Retorno ao foco dentro do prazo
- Dado uma tentativa com contador de perda de foco ativo
- Quando o aluno retornar ao foco em até 10 segundos
- Então a tentativa permanece Em andamento e o sistema registra evento de retorno ao foco.

### CA-03 - Escopo pedagógico de professor
- Dado um professor autenticado sem vínculo com determinada turma/avaliação
- Quando ele tentar ler dados dessa turma/avaliação
- Então a operação deve falhar com permission-denied.

### CA-04 - Alteração de role protegida
- Dado um usuário não-admin autenticado
- Quando ele tentar alterar o campo role em usuarios/{uid}
- Então a operação deve falhar com permission-denied.

### CA-05 - Ação administrativa com auditoria obrigatória
- Dado um admin ou professor autorizado no próprio escopo
- Quando remover desclassificação ou liberar nova tentativa
- Então a operação deve exigir motivo e registrar log com actorUid, actorRole, targetId, ação, motivo e timestamp.

### CA-06 - Botão de resumo indisponível
- Dado uma tentativa concluída com resumo não liberado
- Quando o aluno abrir a tela de detalhes
- Então o botão Ver resumo deve permanecer indisponível e permitir apenas atualização de status.

### CA-07 - Falha de conexão durante prova
- Dado uma tentativa em andamento
- Quando o aluno ficar offline
- Então o sistema deve exibir banner persistente de conexão, enfileirar eventos não críticos localmente e preservar respostas temporárias.

### CA-08 - Reconexão e sincronização
- Dado que existem eventos em fila local por período offline
- Quando a conexão for restabelecida
- Então os eventos devem ser sincronizados em ordem cronológica, com confirmação de persistência no backend.

### CA-09 - Timeout de reconexão
- Dado uma tentativa em andamento com timeout de reconexão configurado
- Quando o timeout for excedido sem reconexão
- Então a tentativa deve ser encerrada como Desclassificada por indisponibilidade de conexão, com motivo e tempo de indisponibilidade registrados.

## Pendências de implementação
- Outros tipos de questão além de múltipla escolha
