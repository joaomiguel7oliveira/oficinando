# Critérios de Aceite - Oficinando

## Objetivo
Centralizar os critérios de aceite dos fluxos críticos para homologação e validação de release.

## Fluxos críticos

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

## Uso em homologação
- Todos os CAs devem ser validados antes de release de produção.
- Falha em qualquer CA crítico bloqueia publicação.
- Execução operacional na matriz: [Matriz de Homologação v1 - Oficinando.md](Matriz%20de%20Homologação%20v1%20-%20Oficinando.md).