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

Todo o JavaScript está em **um só arquivo** (`js/script.js`) e todo o CSS em **um só arquivo**
(`css/estilo.css`). Dentro deles, comentários marcam a área de cada trecho:
`// PARTE 1 — ...` no JavaScript e `/* PARTE 1 — ... */` no CSS (o CSS não aceita `//`).

| Parte | Responsável por | Onde está |
|-------|-----------------|-----------|
| **1 — Interface e Dashboard** | Visual geral, menu, cores, tema noturno, funções comuns e painel | `index.html` + seções **PARTE 1** do `estilo.css` e do `script.js` |
| **2 — Cadastro de Pacientes** | Formulário, tabela, busca, editar, arquivar e excluir pacientes | `pacientes.html` + seções **PARTE 2** do `estilo.css` e do `script.js` |
| **3 — Consultas e Registros Hospitalares** | Prontuário, alerta de alergia, plano de tratamento e histórico de atendimentos | `consultas.html` + seções **PARTE 3** do `estilo.css` e do `script.js` |

```
Life-care/
├── index.html          (Parte 1)
├── pacientes.html      (Parte 2)
├── consultas.html      (Parte 3)
├── css/
│   └── estilo.css      (Parte 1, Parte 2 e Parte 3, nessa ordem)
├── js/
│   └── script.js       (Parte 1, Parte 2 e Parte 3, nessa ordem)
└── img/
    ├── logo.png
    └── icone.png
```

As três páginas carregam o mesmo `script.js`. No fim de cada parte, um `if` verifica se o
elemento principal daquela área existe na página aberta (por exemplo, `formPaciente`); assim
cada área só roda na sua própria página.

> **Atenção:** a metodologia avaliativa pede que **todos os comentários sejam removidos** antes
> da apresentação e arguição. No VS Code: `Ctrl+H`, ative a expressão regular (`Alt+R`) e substitua
> por nada `^\s*//.*\n` no `script.js` e `/\*[\s\S]*?\*/\n?` no `estilo.css`.

As explicações de cada parte estão no guia em PDF que acompanha o projeto.

---
Empresa e dados fictícios, para fins acadêmicos.
