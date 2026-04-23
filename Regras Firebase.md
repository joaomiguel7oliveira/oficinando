# Regras Firebase

## Objetivo
Definir regras de seguranca e validacao para Firebase Authentication, Firestore e Storage no projeto Oficinando.

## Principios
- Regra de menor privilegio: cada perfil acessa apenas o necessario.
- Toda escrita sensivel deve validar papel e ownership.
- Nunca confiar em dados enviados pelo cliente sem validacao de regra.
- Logs de auditoria devem ser append-only para usuarios comuns.

## Authentication
- Provedor unico: Google.
- Usuario autenticado obrigatorio para qualquer leitura/escrita de dados privados.
- Claims customizadas sao opcionais; o papel pode ser lido do documento de usuario.

## Estrategia de papel (role)
- Fonte de verdade: colecao usuarios/{uid}.role.
- Valores permitidos: aluno, professor, admin.
- Elevacao para professor/admin so por conta autorizada previamente.

## Controle de alteracao de role (ponto critico)
- Cliente comum nunca altera role diretamente em usuarios/{uid}.
- Alteracao de role ocorre apenas por admin ou backend (Cloud Functions).
- Toda alteracao de role deve registrar auditoria obrigatoria com: actorUid, actorRole, targetUid, roleAnterior, roleNovo, motivo, timestamp.
- Revogacao de role deve seguir o mesmo fluxo de auditoria da elevacao.
- Falha de auditoria invalida a operacao: sem log, sem alteracao de role.

## Definicao de escopo pedagogico (professor)
Para reduzir ambiguidade, "sob seu escopo" significa:

- Turmas em que professorResponsavelUid == auth.uid em turmas/{turmaId}; e
- Avaliacoes em que professorUid == auth.uid; e
- Tentativas de alunos vinculadas a essas turmas/avaliacoes.

Regras complementares:
- Professor nao pode ler ou editar dados fora das turmas/avaliacoes sob seu escopo.
- Admin pode operar em qualquer escopo.
- Operacoes sensiveis (ex.: remover desclassificacao) devem exigir justificativa e gerar log.

## Firestore - regras por dominio
### usuarios/{uid}
- Leitura:
  - proprio usuario: permitido.
  - professor: permitido apenas para alunos das turmas sob seu escopo pedagogico.
  - admin: permitido globalmente.
- Escrita:
  - proprio usuario: permitido apenas em campos de perfil editaveis (nome, sobrenome, turma dentro de limites de negocio).
  - role, status sensivel e metadados de seguranca: apenas admin/backend.
  - qualquer tentativa de alterar role por usuario nao-admin deve retornar permission-denied.

### avaliacoes/{avaliacaoId}
- Leitura:
  - aluno: apenas avaliacoes liberadas para sua turma.
  - professor: avaliacoes sob seu escopo pedagogico.
  - admin: permitido globalmente.
- Escrita:
  - professor: criar/editar/excluir apenas avaliacoes com professorUid == auth.uid.
  - admin: permitido globalmente.

### tentativas/{tentativaId}
- Leitura:
  - aluno: apenas as proprias tentativas.
  - professor: tentativas de alunos das turmas/avaliacoes sob seu escopo pedagogico.
  - admin: permitido globalmente.
- Escrita:
  - aluno: criar tentativa propria e atualizar respostas enquanto Em andamento.
  - aluno nao pode alterar status final para Concluida/Desclassificada sem validacao de transicao.
  - professor: pode liberar nova tentativa e ajustar flags administrativas apenas dentro do proprio escopo, sempre com log.
  - admin: permitido globalmente, sempre com log.

### respostas/{respostaId} (se separado)
- Leitura:
  - aluno dono da tentativa.
  - professor do escopo pedagogico da tentativa.
  - admin global.
- Escrita:
  - aluno dono durante tentativa Em andamento.
  - bloquear alteracao apos status final.

### eventos_monitoramento/{eventoId}
- Leitura:
  - professor apenas de eventos sob seu escopo pedagogico.
  - admin global.
  - aluno pode ler apenas eventos proprios se necessario.
- Escrita:
  - aluno autenticado escreve apenas eventos proprios (uid confere com auth.uid).
  - impedir update/delete por aluno (append-only).

### configuracoes_plataforma/{configId}
- Leitura:
  - autenticado (somente parametros publicos) ou por documento segmentado.
- Escrita:
  - apenas admin.

## Storage
### Avaliacoes e midias
- Upload permitido apenas para professor/admin em paths da propria avaliacao.
- Tipos permitidos: imagens (exemplo: png, jpg, webp).
- Limite de tamanho por arquivo (exemplo: 5 MB).
- Bloquear sobrescrita indevida fora do escopo.

### Avatares/perfil
- Usuario pode gravar apenas no proprio path de perfil.

## Regras de validacao recomendadas
- Validar tipos e campos obrigatorios por documento.
- Validar enumeracoes (status, role, modos).
- Validar transicao de status:
  - Em andamento -> Concluida ou Desclassificada.
  - Concluida e Desclassificada nao retornam para Em andamento.
- Validar ownership:
  - campo uid do documento deve coincidir com auth.uid quando aplicavel.

## Indices e custo
- Criar indices compostos somente para consultas reais da aplicacao.
- Evitar consultas amplas sem filtro por turma, usuario ou periodo.
- Paginar listas grandes (resultados, eventos).

## Auditoria e rastreabilidade
- Registrar em log acao administrativa critica:
  - liberar tentativa
  - remover desclassificacao
  - bloquear/desbloquear avaliacao
- Log deve incluir: actorUid, actorRole, targetId, acao, motivo, timestamp.

## Regras de erro para cliente
- permission-denied: exibir mensagem amigavel de permissao insuficiente.
- unavailable/deadline-exceeded: orientar reenvio e manter fila local quando aplicavel.
- aborted/conflict: recarregar estado e reaplicar acao idempotente.

## Recomendacao operacional
- Centralizar operacoes sensiveis em Cloud Functions quando houver regra complexa ou risco de corrida.
- Usar transacoes para contadores e mudancas criticas de status/tentativa.
- Criar endpoint administrativo unico para papel (ex.: setUserRole) com validacao de autorizacao + auditoria atomica.
