# Oficinando
Plataforma educacional web com autenticacao Google (Firebase), avaliacoes, painel de professor, controle de tentativas e auditoria.

## Stack
- Frontend: Vue 3 + Vite
- Backend: Firebase (Firestore, Storage, Authentication, Cloud Functions)

## Documentacao do projeto

- [Especificação Funcional - Oficinando.md](Especificação%20Funcional%20-%20Oficinando.md): índice central da especificação funcional.
- [Especificação Funcional - Produto e Fluxos.md](Especificação%20Funcional%20-%20Produto%20e%20Fluxos.md): regras de produto, telas e fluxos funcionais.
- [Especificação Funcional - Segurança e Operação.md](Especificação%20Funcional%20-%20Segurança%20e%20Operação.md): status, anti-cheat, conexão, Cloud Functions e critérios críticos.
- [Especificação Funcional - Entrega v1.md](Especificação%20Funcional%20-%20Entrega%20v1.md): plano MVP, backlog por sprint, testes e NFRs.
- [Critérios de Aceite - Oficinando.md](Critérios%20de%20Aceite%20-%20Oficinando.md): critérios de homologação e gate de release.
- [Matriz de Homologação v1 - Oficinando.md](Matriz%20de%20Homologação%20v1%20-%20Oficinando.md): checklist executável de validação dos CAs.
- [Esquema Firebase.md](Esquema%20Firebase.md): modelagem de dados (Firestore/Storage), consultas e estratégia de consistência.
- [Regras Firebase.md](Regras%20Firebase.md): diretrizes de segurança, escopo pedagógico e auditoria.
- [Design System.md](Design%20System.md): padrões visuais, componentes, layout e acessibilidade.

## Ordem recomendada de execução

1. Fechar Sprint 1 do MVP na especificação funcional.
2. Implementar coleções e regras mínimas de Firestore/Storage.
3. Entregar fluxo de tentativa completo (Sprint 2).
4. Consolidar painel do professor e operações sensíveis via Cloud Functions (Sprint 3).

## Definicao de pronto do v1

- Fluxo ponta a ponta funcionando: criar avaliacao, responder, finalizar, consultar resultados.
- Criterios CA-01 a CA-09 aprovados em homologacao.
- Regras de seguranca e logs obrigatorios ativos para operacoes criticas.