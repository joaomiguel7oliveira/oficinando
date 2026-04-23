# Matriz de Homologação v1 - Oficinando

## Objetivo
Padronizar a validação de homologação do v1 com rastreabilidade por critério de aceite.

## Instruções de uso
1. Inicie a execução desta matriz apenas quando houver build funcional em ambiente de homologação.
2. Execute cada cenário em ambiente de homologação.
3. Registre evidência objetiva (print, log, vídeo curto, ou link de execução).
4. Marque status como Aprovado ou Reprovado.
5. Em caso de reprovação, registrar defeito e bloquear release até correção.

## Estado atual
- Fase do projeto: Construção do sistema (sem execução de homologação no momento).
- Situação da matriz: Preparação de critérios e roteiros.
- Observação: atualizar responsáveis e datas quando houver ambiente homologável.

## Pré-requisitos para iniciar homologação
- Fluxo mínimo implementado e acessível em ambiente de homologação.
- Regras de segurança mínimas aplicadas (acesso por papel e escopo pedagógico).
- Logs de eventos críticos disponíveis para auditoria.
- Time responsável definido (QA, Frontend, Backend e gate final).

## Ordem de execução recomendada
1. CA-03 - Escopo pedagógico de professor
2. CA-04 - Alteração de role protegida
3. CA-05 - Ação administrativa com auditoria obrigatória
4. CA-01 - Desclassificação por perda de foco
5. CA-02 - Retorno ao foco dentro do prazo
6. CA-06 - Botão de resumo indisponível
7. CA-07 - Falha de conexão durante prova
8. CA-08 - Reconexão e sincronização
9. CA-09 - Timeout de reconexão

## Matriz de validação

| ID | Critério | Ambiente | Responsável | Evidência (link) | Status | Data | Defeito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CA-01 | Desclassificação por perda de foco | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-02 | Retorno ao foco dentro do prazo | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-03 | Escopo pedagógico de professor | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-04 | Alteração de role protegida | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-05 | Ação administrativa com auditoria obrigatória | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-06 | Botão de resumo indisponível | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-07 | Falha de conexão durante prova | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-08 | Reconexão e sincronização | Homologação | A definir | A definir | Não iniciado | - | N/A |
| CA-09 | Timeout de reconexão | Homologação | A definir | A definir | Não iniciado | - | N/A |

## Padrão de evidência
- Formato recomendado de link: `docs/homologacao/rodada-X/CA-XX-evidencia.ext`
- Quando aprovado: anexar link de evidência e manter Defeito como N/A.
- Quando reprovado: anexar link de evidência e preencher Defeito com ID do bug (ex.: OFI-123).

## Roteiro resumido de execução por CA

### CA-03 - Escopo pedagógico de professor
- Pré-condição: professor autenticado sem vínculo com turma/avaliação alvo.
- Passo principal: tentar consultar dados da turma/avaliação fora do escopo.
- Resultado esperado: operação falha com `permission-denied`.
- Evidência mínima: print do erro + log da tentativa negada.

### CA-04 - Alteração de role protegida
- Pré-condição: usuário autenticado sem papel admin.
- Passo principal: tentar atualizar `usuarios/{uid}.role` via cliente.
- Resultado esperado: operação falha com `permission-denied`.
- Evidência mínima: print do erro + log de rejeição.

### CA-05 - Ação administrativa com auditoria obrigatória
- Pré-condição: professor no próprio escopo ou admin autenticado.
- Passo principal: executar liberação de nova tentativa ou remoção de desclassificação.
- Resultado esperado: ação exige motivo e grava log completo obrigatório.
- Evidência mínima: print da ação + registro do log com campos obrigatórios.

### CA-01 - Desclassificação por perda de foco
- Pré-condição: tentativa em andamento.
- Passo principal: sair de foco por mais de 10 segundos.
- Resultado esperado: tentativa finaliza como Desclassificada.
- Evidência mínima: vídeo curto do contador + registro de desclassificação com timestamp.

### CA-02 - Retorno ao foco dentro do prazo
- Pré-condição: tentativa em andamento com contador de perda de foco ativo.
- Passo principal: retornar ao foco em até 10 segundos.
- Resultado esperado: tentativa permanece Em andamento e evento de retorno é registrado.
- Evidência mínima: vídeo curto + log do evento de retorno ao foco.

### CA-06 - Botão de resumo indisponível
- Pré-condição: tentativa concluída com resumo não liberado.
- Passo principal: abrir tela de detalhes.
- Resultado esperado: botão Ver resumo permanece indisponível; apenas Atualizar status permitido.
- Evidência mínima: print da tela de detalhes com botão indisponível.

### CA-07 - Falha de conexão durante prova
- Pré-condição: tentativa em andamento e conectada.
- Passo principal: simular offline.
- Resultado esperado: banner persistente exibido, eventos não críticos em fila local e respostas temporárias preservadas.
- Evidência mínima: vídeo curto da transição online para offline + estado da fila local.

### CA-08 - Reconexão e sincronização
- Pré-condição: fila local existente após período offline.
- Passo principal: restabelecer conexão.
- Resultado esperado: sincronização em ordem cronológica com confirmação no backend.
- Evidência mínima: log de sincronização ordenada + confirmação de persistência.

### CA-09 - Timeout de reconexão
- Pré-condição: tentativa em andamento com timeout de reconexão configurado.
- Passo principal: manter indisponibilidade até exceder timeout.
- Resultado esperado: tentativa desclassificada por indisponibilidade de conexão, com motivo e duração registrados.
- Evidência mínima: vídeo curto + log final com motivo e tempo de indisponibilidade.

## Gate de release v1
- Este gate só deve ser aplicado após conclusão da implementação mínima do v1.
- Todos os critérios CA-01 a CA-09 devem estar Aprovados.
- Qualquer item Reprovado bloqueia release.
- Aprovação final deve registrar responsável técnico e data.

## Registro de aprovação final
- Responsável técnico: A definir
- Data: A definir
- Versão/commit homologado: A definir
- Observações finais: A definir

## Referências
- [Critérios de Aceite - Oficinando.md](Critérios%20de%20Aceite%20-%20Oficinando.md)
- [Especificação Funcional - Entrega v1.md](Especificação%20Funcional%20-%20Entrega%20v1.md)