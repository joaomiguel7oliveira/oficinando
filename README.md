# Oficinando

Plataforma educacional web com autenticacao Google (Firebase), aplicacao de avaliacoes, painel de professor, controle de tentativas e trilha de auditoria.

## Status atual
- Fase atual: especificacao e arquitetura.
- Implementado no repositorio: documentacao funcional, design system, regras de seguranca e esquema de dados Firebase.
- Nao implementado ainda: codigo da aplicacao (frontend/backend), regras reais de deploy e testes automatizados.

## Documentos principais
- Especificacao funcional: `Especificação Funcional - Oficinando.md`
- Design system: `Design System.md`
- Regras Firebase: `Regras Firebase.md`
- Esquema Firebase: `Esquema Firebase.md`

## Como usar este repositorio (onboarding)
1. Leia `Especificação Funcional - Oficinando.md` para entender fluxo de produto e regras de negocio.
2. Leia `Regras Firebase.md` para regras de seguranca, escopo e auditoria.
3. Leia `Esquema Firebase.md` para modelagem de colecoes e paths de storage.
4. Leia `Design System.md` para diretrizes visuais e comportamento de interface.
5. Use os CAs (criterios de aceite) da especificacao como base de implementacao e teste.

## Estrutura esperada quando iniciar implementacao
```
oficinando/
	app/                      # frontend web
	functions/                # Cloud Functions (operacoes sensiveis)
	firebase/
		firestore.rules
		storage.rules
		firestore.indexes.json
	docs/                     # opcional: mover documentacao para pasta dedicada
	README.md
```

## Backlog tecnico imediato
- Converter `Regras Firebase.md` em `firestore.rules` e `storage.rules`.
- Converter indices planejados em `firestore.indexes.json`.
- Criar endpoint administrativo unico para papel (ex.: setUserRole) com auditoria atomica.
- Implementar fluxo de tentativa com transicoes de status seguras.
- Implementar fila offline/reconexao no cliente para fluxo de prova.

## Roadmap de entrega por marcos

### Marco 1 - Fundacao e autenticacao
Objetivo: colocar app no ar com login, perfil e estrutura basica de navegacao.

Escopo:
- Login/logout Google.
- Cadastro de perfil no primeiro acesso (nome, sobrenome, turma).
- Home aluno e professor com navegacao base.
- Setup inicial Firebase (Auth + Firestore + Storage).

Concluido quando:
- Usuario entra com Google e acessa sua home correta por papel.
- Perfil eh criado e respeita regras de atualizacao diaria.

### Marco 2 - Avaliacao principal (MVP)
Objetivo: publicar e responder avaliacao de ponta a ponta.

Escopo:
- Criador de avaliacao (sem IA avancada no inicio).
- Aplicacao de prova com tentativas, respostas e finalizacao.
- Tela de detalhes e resumo basico.
- Regras de status e precedencia (Em andamento/Concluida/Desclassificada).

Concluido quando:
- Professor cria avaliacao e aluno completa tentativa com resultado persistido.
- Fluxos CA-01 a CA-06 validados.

### Marco 3 - Seguranca, escopo e auditoria
Objetivo: garantir governanca de dados e operacoes sensiveis.

Escopo:
- Regras completas de Firestore/Storage por escopo pedagogico.
- Endpoint administrativo de role e acoes sensiveis com log obrigatorio.
- Painel inicial de resultados com filtro por turma/avaliacao.
- Logs de monitoramento visiveis para professor conforme escopo.

Concluido quando:
- Professor so acessa dados do proprio escopo.
- Alteracao de role fora de admin falha com permission-denied.
- Logs administrativos sao gerados em 100% das acoes sensiveis.

### Marco 4 - Robustez e recursos avancados
Objetivo: elevar confiabilidade e diferenciais do produto.

Escopo:
- Fila offline/reconexao com sincronizacao cronologica.
- Exportacao de dados (CSV/Excel/PDF).
- Banco de questoes.
- Nanograma e fluxo de aprovacao de nanograma de aluno.
- Criacao com IA (Gemini) com revisao humana obrigatoria.

Concluido quando:
- Fluxos CA-07 a CA-09 validados.
- Recursos avancados funcionando sem quebrar regras de seguranca e custo.

## Criterio de prioridade
Sempre priorizar:
1. Seguranca e autorizacao.
2. Fluxo principal de avaliacao.
3. Confiabilidade (offline/reconexao).
4. Recursos diferenciais (nanograma e IA).

## Definicao de pronto (DoD)
Uma entrega so e considerada pronta quando:
- Cumpre criterios de aceite aplicaveis.
- Respeita regras de escopo e seguranca.
- Tem log/auditoria nas acoes administrativas.
- Nao aumenta custo de leitura/escrita sem justificativa.
- Esta alinhada ao `Design System.md`.