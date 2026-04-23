# Especificação Funcional - Segurança e Operação

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

### Política de revisão pedagógica (obrigatória)
- Toda desclassificação deve ser passível de revisão por professor responsável ou admin.
- O aluno deve visualizar motivo e horário da desclassificação na tela de detalhes.
- Remoção de desclassificação exige justificativa textual e registro de auditoria.
- Manter histórico imutável do evento original e da revisão administrativa.

## Permanência obrigatória
- Impede saída do ambiente da plataforma após concluir avaliação, até liberação do professor.
- Aluno pode acessar partes permitidas internamente (exemplo: minijogo).

### Infração de permanência
- Se o aluno sair do ambiente durante permanência obrigatória, registrar Infração de permanência.
- A infração não altera nota automaticamente.
- Professor visualiza a infração na tela de detalhes e resultados.
- A infração não é uma informação importante então não precisa aparecer em destaque.

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

## Fronteira Cliente vs Cloud Functions (obrigatória)

### Operações no cliente (frontend + SDK)
- Login/logout e leitura de dados do próprio escopo.
- Criação e atualização de respostas durante tentativa em andamento.
- Registro de eventos não críticos de monitoramento próprios do aluno.

### Operações obrigatoriamente no backend (Cloud Functions)
- Alteração de role (setUserRole) com auditoria atômica.
- Liberação de nova tentativa com validação de limites e justificativa.
- Remoção de desclassificação com justificativa obrigatória e log.
- Encerramento administrativo de tentativa (quando aplicável) com trilha de auditoria.

### Regras de consistência para funções
- Operações sensíveis devem ser transacionais quando alterarem status + log.
- Sem log persistido, a operação deve falhar integralmente.
- Toda função deve validar actorRole, escopo pedagógico e ownership do alvo.

## Critérios de aceite

Os critérios de aceite foram centralizados em [Critérios de Aceite - Oficinando.md](Critérios%20de%20Aceite%20-%20Oficinando.md).
