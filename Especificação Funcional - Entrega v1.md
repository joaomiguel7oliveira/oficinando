# Especificação Funcional - Entrega v1

## O que é o v1
Fluxo completo e seguro da plataforma: professor cria avaliação, aluno responde, sistema finaliza, professor vê resultados e toma ações com auditoria.

## O que entra no v1
- Login Google e perfil inicial.
- Home do aluno e do professor com lista de avaliações.
- Criador de avaliação (múltipla escolha, sem IA).
- Execução da avaliação: tentativa, respostas, conclusão e desclassificação.
- Tela de detalhes e resumo do aluno.
- Painel de resultados do professor com filtros básicos e ações essenciais.
- Regras de segurança mínimas no Firestore/Storage.
- Registro de eventos críticos para auditoria.

## O que fica para depois (pós-v1)
- Geração com IA avançada.
- Banco de questões com importação/exportação.
- Exportação PDF/Excel.
- Fluxo avançado de nanograma (autoria por aluno e moderação).
- Personalização visual extensa.

## Pronto quando
- Entra no v1: funcionalidade sem a qual o fluxo fim a fim não funciona.
- Sai do v1: fluxo estável, segurança e auditoria aplicadas, CA-01 a CA-09 aprovados em homologação.

## Sprints

### Sprint 1 - Base
O que construir:
- Coleções: `usuarios`, `avaliacoes`, `questoes`.
- Telas: login, primeiro login, home aluno, home professor, criador de avaliação.
- Regras básicas de acesso por papel.
- Índices para listagem por turma e status.

Pronto quando:
- Professor cria avaliação com ao menos 1 questão e publica.
- Aluno da turma visualiza a avaliação.
- Regras bloqueiam acesso fora do escopo.

### Sprint 2 - Execução da avaliação
O que construir:
- Coleções: `tentativas`, `tentativas/respostas`, `eventos_monitoramento`.
- Telas: prova, detalhes, resumo.
- Regras de transição de status da tentativa.
- Fila local de eventos e sincronização na reconexão.

Pronto quando:
- Tentativa percorre os status corretamente.
- Desclassificação por foco ou conexão gera log.
- Resumo bloqueado quando não liberado.

### Sprint 3 - Painel do professor e segurança final
O que construir:
- Tela de resultados com filtros essenciais.
- Operações sensíveis via Cloud Functions com log atômico.
- Regras finais de Firestore/Storage.
- Paginação em telas históricas.

Pronto quando:
- Professor só acessa o próprio escopo.
- Toda ação crítica gera log completo.
- CA-01 a CA-09 aprovados.

## Testes mínimos
- Unitário: transições de status e validações.
- Integração: regras de segurança por perfil no Firestore.
- E2E: professor cria avaliação, aluno responde, professor analisa.
- Cobertura obrigatória: todos os CAs (CA-01 a CA-09).
- Qualquer falha em CA crítico ou regressão de segurança bloqueia release.

## Requisitos não funcionais

| Área | Meta |
| --- | --- |
| Performance | Home ≤ 2,5s; ações críticas ≤ 1,5s |
| Custo Firebase | Máx. 25 docs/página; sem listeners em telas históricas; monitorar orçamento |
| Confiabilidade | Ações administrativas idempotentes; retentativa com backoff pós-offline |
| Segurança | Default deny; eventos append-only para alunos |
| Observabilidade | Log obrigatório: `actorUid`, `actorRole`, `targetId`, `acao`, `motivo`, `timestamp`; toda ação de prova vinculada à tentativa |
