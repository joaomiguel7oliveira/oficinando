# Esquema de Organizacao do Firebase

## Objetivo
Definir organizacao de colecoes/documentos no Firestore e padroes de paths no Storage para a plataforma Oficinando.

## Convencoes gerais
- IDs de documento: auto-ID do Firestore, exceto quando uid for chave natural (usuarios/{uid}).
- Campos de data: usar Timestamp do servidor.
- Campos de controle: createdAt, updatedAt, createdBy, updatedBy quando fizer sentido.
- Soft delete preferencial em dados pedagogicos criticos (campo isArchived).

## Firestore - visao geral

### usuarios/{uid}
Perfil principal de cada conta.

Campos sugeridos:
- uid: string
- email: string
- nome: string
- sobrenome: string
- role: enum (aluno|professor|admin)
- turmaIdAtual: string|null
- nomeAlteradoEm: timestamp|null
- turmaAlteradaEm: timestamp|null
- ativo: boolean
- createdAt: timestamp
- updatedAt: timestamp

### turmas/{turmaId}
Cadastro de turmas.

Campos sugeridos:
- nome: string
- codigo: string
- descricao: string
- ativa: boolean
- professorResponsavelUid: string|null
- createdAt: timestamp
- updatedAt: timestamp

### avaliacoes/{avaliacaoId}
Metadados e configuracoes da avaliacao.

Campos sugeridos:
- titulo: string
- descricao: string
- professorUid: string
- turmaIdsVisiveis: array<string>
- statusDisponibilidade: enum (liberada|bloqueada)
- tentativasPermitidas: number
- permitirPular: boolean
- limitePulosPorTentativa: number
- modoAlternativas: enum (ocultas_ao_clicar|sempre_visivel)
- embaralhamento: enum (nenhum|questoes_e_alternativas|alternativas|questoes)
- tempoLimiteTotalSeg: number|null
- permanenciaObrigatoriaPadrao: boolean
- resumoLiberadoPadrao: boolean
- prazoEntregaEm: timestamp|null
- liberacaoAutomaticaEm: timestamp|null
- visibilidade: enum (publica|privada)
- iaConfig: map|null
- isArchived: boolean
- createdAt: timestamp
- updatedAt: timestamp

### avaliacoes/{avaliacaoId}/questoes/{questaoId}
Questoes da avaliacao.

Campos sugeridos:
- ordem: number
- enunciadoMd: string
- imagemUrl: string|null
- alternativas: array<map>
- alternativaCorretaId: string
- peso: number
- explicacaoMd: string|null
- tempoLimiteSeg: number|null
- createdAt: timestamp
- updatedAt: timestamp

Formato de alternativa (map):
- id: string
- texto: string

### tentativas/{tentativaId}
Registro principal de uma tentativa do aluno.

Campos sugeridos:
- avaliacaoId: string
- alunoUid: string
- turmaId: string
- numeroTentativa: number
- statusTentativa: enum (em_andamento|concluida|desclassificada)
- motivoDesclassificacao: string|null
- permanenciaObrigatoriaAtiva: boolean
- infracaoPermanencia: boolean
- resumoLiberado: boolean
- iniciadaEm: timestamp
- finalizadaEm: timestamp|null
- duracaoSeg: number|null
- acertos: number|null
- totalQuestoes: number
- pontuacao: number|null
- pontuacaoMaxima: number|null
- conexaoInstavelSeg: number
- createdAt: timestamp
- updatedAt: timestamp

### tentativas/{tentativaId}/respostas/{questaoId}
Resposta por questao em cada tentativa.

Campos sugeridos:
- questaoId: string
- alternativaMarcadaId: string|null
- correta: boolean|null
- emBranco: boolean
- tempoGastoSeg: number|null
- atualizadaEm: timestamp

### eventos_monitoramento/{eventoId}
Eventos de auditoria e monitoramento.

Campos sugeridos:
- tentativaId: string|null
- avaliacaoId: string|null
- alunoUid: string|null
- actorUid: string
- actorRole: enum (aluno|professor|admin|sistema)
- tipoEvento: string
- severidade: enum (info|aviso|critico)
- detalhes: map
- criadoEm: timestamp

Tipos de evento recomendados:
- tentativa_iniciada
- foco_perdido
- foco_recuperado
- desclassificacao_aplicada
- tentativa_concluida
- liberacao_nova_tentativa
- desclassificacao_removida
- infracao_permanencia

### autorizacoes_professor/{uid}
Lista de contas autorizadas a assumir papel de professor.

Campos sugeridos:
- uid: string
- email: string
- ativo: boolean
- criadoEm: timestamp
- criadoPor: string

### configuracoes_plataforma/global
Configuracoes administrativas.

Campos sugeridos:
- timeoutFocoSeg: number
- timeoutReconexaoSeg: number
- limiteAlteracaoPerfilHoras: number
- bannerManutencaoAtivo: boolean
- temaPadrao: string
- updatedAt: timestamp

## Storage - organizacao de paths

### Imagens de questoes
- /avaliacoes/{avaliacaoId}/questoes/{questaoId}/{arquivo}

### Midias de nanograma
- /nanogramas/{nanogramaId}/{arquivo}

### Perfil de usuario
- /usuarios/{uid}/perfil/{arquivo}

## Consultas chave (para indexacao)
- tentativas por avaliacao + turma + status + data
- tentativas por aluno + data desc
- avaliacoes por turma visivel + statusDisponibilidade
- eventos por tentativa + criadoEm desc

## Estrategia de escrita e consistencia
- Criar tentativa e snapshot inicial em transacao.
- Finalizacao de tentativa em transacao (status, pontuacao, finalizadaEm).
- Eventos de monitoramento sempre append-only.
- Operacoes administrativas sensiveis preferencialmente via Cloud Functions.

## Estrategia de custo
- Evitar listeners em telas com alto volume historico (usar paginacao por pagina).
- Manter documentos enxutos e mover detalhes para subcolecoes.
- Evitar duplicacao excessiva, mas usar snapshots quando necessario para historico imutavel.
