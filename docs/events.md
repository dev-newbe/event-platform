# NEWBE Lead Hub — CONARH 2026

> Documento de referência consolidado do sistema de captação e qualificação de leads da NEWBE para utilização durante o CONARH 2026.

---

## Sumário

1. Objetivo do Produto
2. Visão Geral
3. Perfis de Usuário
4. Fluxos do Sistema
5. Pré-Captação de Leads
6. Captação de Leads
7. Agendamento Inteligente
8. Distribuição de Executivos
9. Gestão de Leads
10. Dashboard e Métricas
11. Regras de Negócio
12. Evoluções Futuras

---

# 1. Objetivo do Produto

O NEWBE Lead Hub tem como objetivo centralizar a captura, qualificação e acompanhamento de leads gerados durante eventos corporativos.

A primeira versão será utilizada durante o CONARH 2026 e deverá permitir:

- Captura rápida de leads;
- Qualificação comercial;
- Agendamento de reuniões;
- Distribuição automática para executivos;
- Acompanhamento do funil comercial;
- Geração de indicadores do evento.

---

# 2. Visão Geral

O sistema será composto por dois fluxos principais.

## Pré-Captação

Fluxo utilizado pelo time SDR.

Objetivo:

Identificar potenciais clientes, realizar uma qualificação inicial e agendar uma reunião durante o evento.

---

## Captação

Fluxo utilizado durante o evento.

Objetivo:

Registrar rapidamente um lead abordado no estande da NEWBE.

Não possui agendamento.

---

# 3. Perfis de Usuário

## SDR

Responsável pela qualificação inicial.

Ações:

- Cadastrar lead
- Agendar reunião
- Atualizar informações

---

## Executivo Comercial

Responsável pelo atendimento.

Ações:

- Visualizar agenda
- Atualizar status
- Registrar observações

---

## Administrador

Responsável pela gestão da operação.

Ações:

- Configurar agenda
- Gerenciar usuários
- Exportar relatórios

---

# 4. Fluxos do Sistema

## Fluxo de Pré-Captação

SDR

↓

Cadastro

↓

Qualificação

↓

Agendamento

↓

Distribuição Automática

↓

Executivo Comercial

---

## Fluxo de Captação

Evento

↓

Cadastro Rápido

↓

Lead Registrado

↓

Follow-up Comercial

---

# 5. Pré-Captação de Leads

## Dados da Empresa

| Campo | Obrigatório |
|---------|---------|
| Empresa | Sim |
| CNPJ | Sim |
| Nº de Colaboradores | Sim |

### Faixas

- Até 50
- 51 a 100
- 101 a 500
- 501 a 1.000
- 1.001 a 5.000
- Acima de 5.000

---

## Dados do Contato

| Campo | Obrigatório |
|---------|---------|
| Nome do Funcionário | Sim |
| Cargo | Não |
| Responsável da Área | Sim |
| Telefone | Sim |
| E-mail | Sim |

---

## Soluções Apresentadas

Seleção múltipla.

- Vale Transporte
- Multibenefícios
- Crédito Smart
- TotalPass
- Vale Alimentação
- Vale Refeição
- Vale Combustível
- Sodexo
- Outro

---

## Qualificação

### Solução Atual

- Flash
- Caju
- Swile
- Alelo
- Ticket
- VR
- Sodexo
- Outro

### Interesse

- Quente
- Morno
- Frio

### Momento da Contratação

- Imediato
- Até 30 dias
- Até 90 dias
- Até 6 meses
- Sem previsão

---

## Dados Internos

### Colaborador NEWBE

Usuário logado.

### Evento

CONARH 2026

### Data de Cadastro

Automática.

---

# 6. Agendamento Inteligente

Disponível apenas para Pré-Captação.

O SDR deverá selecionar:

- Dia
- Horário

O sistema será responsável pela atribuição automática do executivo.

---

# 7. Distribuição de Executivos

O sistema deverá operar utilizando distribuição balanceada.

Executivos cadastrados:

- Executivo A
- Executivo B
- Executivo C

Critério:

Round Robin Balanceado.

Objetivo:

Distribuir reuniões de forma uniforme.

Exemplo:

Executivo A = 10 reuniões

Executivo B = 8 reuniões

Executivo C = 8 reuniões

Próxima reunião:

Executivo B ou C.

---

# 8. Captação de Leads

Possui os mesmos campos da Pré-Captação.

Diferença:

- Não possui agenda.
- Não possui agendamento.
- Processo simplificado.

Objetivo:

Maximizar velocidade de cadastro durante o evento.

---

# 9. Gestão de Leads

Cada lead deverá possuir um status.

Novo

↓

Qualificado

↓

Agendado

↓

Em Atendimento

↓

Proposta Enviada

↓

Negociação

↓

Fechado Ganho

ou

↓

Fechado Perdido

---

# 10. Dashboard e Métricas

## Indicadores Operacionais

- Total de Leads
- Total de Empresas
- Total de Reuniões
- Total de Executivos

---

## Indicadores Comerciais

- Leads Quentes
- Leads Mornos
- Leads Frios

---

## Indicadores de Produto

- Soluções mais apresentadas
- Soluções com maior interesse
- Empresas por porte
- Conversões

---

# 11. Regras de Negócio

RN01

Não permitir CNPJ duplicado para o mesmo evento.

---

RN02

Telefone obrigatório.

---

RN03

E-mail obrigatório.

---

RN04

Campo Outro obrigatório quando selecionado.

---

RN05

Somente Pré-Captação permite agendamento.

---

RN06

Distribuição automática de executivos.

---

RN07

Horários bloqueados não podem ser utilizados.

---

RN08

Todo lead inicia com status Novo.

---

RN09

Colaborador NEWBE deve ser preenchido automaticamente.

---

# 12. Evoluções Futuras

## V2

- QR Code
- OCR de Cartão de Visita
- WhatsApp
- Integração CRM

## V3

- Lead Scoring com IA
- Sugestão de Próxima Ação
- Resumo Automático da Conversa
- Assistente Comercial NEWBE