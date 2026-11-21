# LifeCare — Registros de Pacientes de Hospital

> *Cuidado contínuo, história completa.*

Projeto prático da disciplina **Programação Web Frontend (II Unidade)** — Estudo de caso 7.
Sistema web simples feito com **HTML, CSS e JavaScript puro** (sem frameworks) para cadastrar
pacientes, consultar o histórico médico e registrar consultas, exames e tratamentos.

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador (dois cliques já funcionam).
   - Opcional: use a extensão **Live Server** do VS Code.
3. Na primeira vez, o sistema cria alguns pacientes fictícios de exemplo.
   Para começar do zero, abra o console do navegador (F12) e rode `localStorage.clear()`.

Os dados ficam salvos no próprio navegador (`localStorage`).

## Funcionalidades (CRUD)

| Operação  | Onde                         | O que faz                                                           |
|-----------|------------------------------|---------------------------------------------------------------------|
| Criar     | Pacientes / Consultas        | Cadastra pacientes e adiciona registros ao prontuário               |
| Ler       | Painel / Pacientes / Consultas | Lista, busca e abre o histórico completo do paciente              |
| Atualizar | Pacientes / Consultas        | Edita dados do paciente, atualiza o plano de tratamento e registros |
| Excluir   | Pacientes / Consultas        | Arquiva pacientes (conforme norma), exclui definitivamente e remove registros |

Extras: alerta vermelho de alergia, busca por nome/CPF, filtros, modo **Plantão noturno**
(tema escuro que não cansa a vista) e layout que funciona no celular.

## Divisão do código em 3 partes

| Parte | Responsável por | Arquivos |
|-------|-----------------|----------|
| **1 — Interface e Dashboard** | Visual geral, menu, cores, tema noturno, funções comuns e painel | `index.html`, `css/estilo.css`, `js/comum.js`, `js/dashboard.js` |
| **2 — Cadastro de Pacientes** | Formulário, tabela, busca, editar, arquivar e excluir pacientes | `pacientes.html`, `css/pacientes.css`, `js/pacientes.js` |
| **3 — Consultas e Registros Hospitalares** | Prontuário, alerta de alergia, plano de tratamento e histórico de atendimentos | `consultas.html`, `css/consultas.css`, `js/consultas.js` |

```
Life-care/
├── index.html          (Parte 1)
├── pacientes.html      (Parte 2)
├── consultas.html      (Parte 3)
├── css/
│   ├── estilo.css      (Parte 1 — usado por todas as páginas)
│   ├── pacientes.css   (Parte 2)
│   └── consultas.css   (Parte 3)
├── js/
│   ├── comum.js        (Parte 1 — usado por todas as páginas)
│   ├── dashboard.js    (Parte 1)
│   ├── pacientes.js    (Parte 2)
│   └── consultas.js    (Parte 3)
└── img/
    ├── logo.png
    └── icone.png
```

O código **não tem comentários**, como pede a metodologia avaliativa para a apresentação.
As explicações de cada parte estão no guia em PDF que acompanha o projeto.

---
Empresa e dados fictícios, para fins acadêmicos.
