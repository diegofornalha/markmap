# Erro "No session ID found" no Node "WBM"

## Análise do Problema

### Configuração Atual do Node "WBM"
- sessionIdType: Configurado como `fromInput`
- sessionKey: Configurado como `={{ $json.sessionId }}`
- Comportamento: Node espera receber ID de sessão da entrada
- Campo necessário: `sessionId` no JSON de entrada

### Possível Causa do Erro
- Campo `sessionId` ausente
- Campo `sessionId` com nome incorreto
- Falha na transmissão do campo entre nodes

## Solução

### 1. Verifique o Node Anterior
- Inspecione a saída do node precedente
- Use funcionalidade de "Debug"
- Visualize o JSON de saída
- Confirme existência do campo

### 2. Corrija a Expressão
- Verifique nome correto do campo
- Ajuste expressão no sessionKey
- Exemplo de correção:
  - De: `={{ $json.sessionId }}`
  - Para: `={{ $json.idDaSessao }}`

### 3. Adicione um Node de Set
- Use quando campo estiver ausente
- Insira antes do node "WBM"
- Crie campo `sessionId` manualmente
- Configure valor desejado

## Considerações Finais
- Teste o workflow após correções
- Verifique configuração dos nodes
- Confirme transmissão do sessionId
- Valide resolução do erro 