// ==================================================================
// PARTE 1 — INTERFACE E DASHBOARD
// Área comum: dados, funções de apoio e tema (usada pelas 3 páginas)
// ==================================================================

const CHAVE_PACIENTES = "lifecare_pacientes";
const CHAVE_REGISTROS = "lifecare_registros";
const CHAVE_TEMA = "lifecare_tema";

let temporizadorMensagem;

// Parte 1 — Ler e salvar dados no navegador (localStorage)
function lerLista(chave) {
  const texto = localStorage.getItem(chave);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function salvarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

// Parte 1 — Funções de apoio: id, datas, idade, segurança e mensagens
function gerarId() {
  return Date.now();
}

function dataDeHoje() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

function formatarData(data) {
  if (!data) {
    return "-";
  }
  return data.split("-").reverse().join("/");
}

function calcularIdade(nascimento) {
  const hoje = new Date();
  const nasc = new Date(nascimento + "T00:00:00");
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNasc = nasc.getMonth();
  if (mesAtual < mesNasc || (mesAtual === mesNasc && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

function protegerTexto(texto) {
  const caixa = document.createElement("div");
  caixa.textContent = texto;
  return caixa.innerHTML;
}

function mostrarMensagem(texto, tipo) {
  const caixa = document.getElementById("mensagem");
  caixa.textContent = texto;
  caixa.className = "mensagem visivel " + tipo;
  clearTimeout(temporizadorMensagem);
  temporizadorMensagem = setTimeout(function () {
    caixa.className = "mensagem";
  }, 3000);
}

// Parte 1 — Dados fictícios de exemplo (criados só na primeira vez)
function criarDadosIniciais() {
  if (localStorage.getItem(CHAVE_PACIENTES) !== null) {
    return;
  }

  const pacientes = [
    {
      id: 1,
      nome: "Maria Aparecida Souza",
      cpf: "123.456.789-00",
      nascimento: "1958-03-14",
      sexo: "Feminino",
      telefone: "(62) 99812-3344",
      convenio: "Unimed",
      sangue: "O+",
      alergias: "Penicilina",
      historico: "Hipertensão arterial controlada. Retirada da vesícula em 2015.",
      plano: "Losartana 50 mg uma vez ao dia. Aferir a pressão semanalmente.",
      status: "ativo",
      cadastro: "2026-09-10"
    },
    {
      id: 2,
      nome: "João Pedro Almeida",
      cpf: "987.654.321-00",
      nascimento: "1990-07-22",
      sexo: "Masculino",
      telefone: "(62) 98144-5520",
      convenio: "Particular",
      sangue: "A+",
      alergias: "",
      historico: "Sem doenças crônicas. Fratura no punho direito em 2026.",
      plano: "Fisioterapia duas vezes por semana durante seis semanas.",
      status: "ativo",
      cadastro: "2026-10-05"
    },
    {
      id: 3,
      nome: "Ana Clara Ribeiro",
      cpf: "456.789.123-00",
      nascimento: "2001-11-30",
      sexo: "Feminino",
      telefone: "(62) 99230-1187",
      convenio: "Bradesco Saúde",
      sangue: "B-",
      alergias: "Dipirona e frutos do mar",
      historico: "Asma leve desde a infância.",
      plano: "Bombinha de salbutamol em caso de crise. Retorno em 30 dias.",
      status: "ativo",
      cadastro: "2026-10-21"
    },
    {
      id: 4,
      nome: "Francisca Oliveira",
      cpf: "321.654.987-00",
      nascimento: "1949-05-02",
      sexo: "Feminino",
      telefone: "(62) 3241-7788",
      convenio: "IPASGO",
      sangue: "O-",
      alergias: "Látex",
      historico: "Insuficiência cardíaca leve. Usa marcapasso desde 2020.",
      plano: "Internada na enfermaria cardiológica. Monitorar sinais vitais a cada 4 horas.",
      status: "ativo",
      cadastro: "2026-11-15"
    },
    {
      id: 5,
      nome: "Carlos Eduardo Lima",
      cpf: "741.852.963-00",
      nascimento: "1975-01-08",
      sexo: "Masculino",
      telefone: "(62) 98500-4411",
      convenio: "SulAmérica",
      sangue: "AB+",
      alergias: "",
      historico: "Diabetes tipo 2.",
      plano: "",
      status: "arquivado",
      cadastro: "2026-03-15"
    }
  ];

  const registros = [
    {
      id: 101,
      pacienteId: 1,
      tipo: "Consulta",
      data: "2026-11-18",
      profissional: "Dra. Renata Moraes",
      situacao: "Concluído",
      descricao: "Relata dores de cabeça ocasionais. Pressão 14x9. Dose da medicação ajustada."
    },
    {
      id: 102,
      pacienteId: 1,
      tipo: "Exame",
      data: "2026-11-19",
      profissional: "Laboratório LifeCare",
      situacao: "Concluído",
      descricao: "Hemograma completo dentro da normalidade. Colesterol total: 210 mg/dL."
    },
    {
      id: 103,
      pacienteId: 2,
      tipo: "Tratamento",
      data: "2026-11-10",
      profissional: "Ft. Marcos Vieira",
      situacao: "Em andamento",
      descricao: "Fisioterapia para fortalecimento do punho direito. 4 de 12 sessões realizadas."
    },
    {
      id: 104,
      pacienteId: 3,
      tipo: "Consulta",
      data: "2026-11-20",
      profissional: "Dra. Renata Moraes",
      situacao: "Concluído",
      descricao: "Crise de asma leve após exercício. Paciente orientada sobre o uso da bombinha."
    },
    {
      id: 105,
      pacienteId: 4,
      tipo: "Tratamento",
      data: "2026-11-15",
      profissional: "Dr. Henrique Sales",
      situacao: "Em andamento",
      descricao: "Internação para ajuste da medicação cardíaca."
    },
    {
      id: 106,
      pacienteId: 4,
      tipo: "Exame",
      data: "2026-11-16",
      profissional: "Laboratório LifeCare",
      situacao: "Concluído",
      descricao: "Ecocardiograma: fração de ejeção de 45%."
    },
    {
      id: 107,
      pacienteId: 4,
      tipo: "Observação",
      data: "2026-11-20",
      profissional: "Enf. Paulo Mendes",
      situacao: "Concluído",
      descricao: "Plantão noturno sem intercorrências. Sinais vitais estáveis."
    },
    {
      id: 108,
      pacienteId: 5,
      tipo: "Consulta",
      data: "2026-03-15",
      profissional: "Dr. Henrique Sales",
      situacao: "Concluído",
      descricao: "Acompanhamento da glicemia. Paciente transferido para outra unidade."
    }
  ];

  salvarLista(CHAVE_PACIENTES, pacientes);
  salvarLista(CHAVE_REGISTROS, registros);
}

// Parte 1 — Modo plantão noturno
function aplicarTema() {
  const tema = localStorage.getItem(CHAVE_TEMA);
  const botao = document.getElementById("botaoTema");
  if (tema === "noturno") {
    document.body.classList.add("noturno");
    botao.textContent = "☀️ Modo dia";
  } else {
    document.body.classList.remove("noturno");
    botao.textContent = "🌙 Plantão noturno";
  }
}

function alternarTema() {
  if (document.body.classList.contains("noturno")) {
    localStorage.setItem(CHAVE_TEMA, "dia");
  } else {
    localStorage.setItem(CHAVE_TEMA, "noturno");
  }
  aplicarTema();
}

// Parte 1 — Carrega os dados e o tema (roda em todas as páginas)
criarDadosIniciais();
let pacientes = lerLista(CHAVE_PACIENTES);
let registros = lerLista(CHAVE_REGISTROS);
document.getElementById("botaoTema").addEventListener("click", alternarTema);
aplicarTema();


// ==================================================================
// PARTE 1 — INTERFACE E DASHBOARD
// Painel geral (index.html)
// ==================================================================

function mostrarDataDeHoje() {
  const hoje = new Date();
  const texto = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  document.getElementById("dataHoje").textContent = "Hoje é " + texto + ". Bom trabalho, equipe!";
}

function buscarNomePaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  if (paciente) {
    return paciente.nome;
  }
  return "Paciente removido";
}

function atualizarCartoes() {
  const ativos = pacientes.filter(p => p.status === "ativo");
  const comAlergia = ativos.filter(p => p.alergias !== "");
  const tratamentos = registros.filter(r => r.tipo === "Tratamento" && r.situacao === "Em andamento");

  document.getElementById("totalAtivos").textContent = ativos.length;
  document.getElementById("totalRegistros").textContent = registros.length;
  document.getElementById("totalTratamentos").textContent = tratamentos.length;
  document.getElementById("totalAlergias").textContent = comAlergia.length;
}

function mostrarAlertas() {
  const lista = document.getElementById("listaAlertas");
  const comAlergia = pacientes.filter(p => p.status === "ativo" && p.alergias !== "");

  if (comAlergia.length === 0) {
    lista.innerHTML = "<li class='vazio'>Nenhum alerta crítico no momento.</li>";
    return;
  }

  lista.innerHTML = "";
  comAlergia.forEach(function (paciente) {
    lista.innerHTML += `
      <li class="item-alerta">
        <a href="consultas.html?id=${paciente.id}">
          <strong>${protegerTexto(paciente.nome)}</strong>
          <span>Alergia: ${protegerTexto(paciente.alergias)}</span>
        </a>
      </li>`;
  });
}

function mostrarUltimosRegistros() {
  const lista = document.getElementById("listaUltimos");
  const ordenados = registros.slice().sort((a, b) => new Date(b.data) - new Date(a.data));
  const ultimos = ordenados.slice(0, 5);

  if (ultimos.length === 0) {
    lista.innerHTML = "<li class='vazio'>Nenhum registro cadastrado.</li>";
    return;
  }

  lista.innerHTML = "";
  ultimos.forEach(function (registro) {
    lista.innerHTML += `
      <li class="item-registro">
        <div>
          <span class="etiqueta">${protegerTexto(registro.tipo)}</span>
          <strong>${protegerTexto(buscarNomePaciente(registro.pacienteId))}</strong>
        </div>
        <small>${formatarData(registro.data)} · ${protegerTexto(registro.profissional)}</small>
      </li>`;
  });
}

if (document.getElementById("listaAlertas") !== null) {
  mostrarDataDeHoje();
  atualizarCartoes();
  mostrarAlertas();
  mostrarUltimosRegistros();
}


// ==================================================================
// PARTE 2 — CADASTRO DE PACIENTES
// Formulário, tabela, busca, editar, arquivar e excluir (pacientes.html)
// ==================================================================

let idEmEdicao = null;

const formulario = document.getElementById("formPaciente");
const campoBusca = document.getElementById("busca");
const filtroStatus = document.getElementById("filtroStatus");
const botaoCancelar = document.getElementById("botaoCancelar");

function pegarDadosDoFormulario() {
  return {
    nome: document.getElementById("nome").value.trim(),
    cpf: document.getElementById("cpf").value.trim(),
    nascimento: document.getElementById("nascimento").value,
    sexo: document.getElementById("sexo").value,
    telefone: document.getElementById("telefone").value.trim(),
    convenio: document.getElementById("convenio").value,
    sangue: document.getElementById("sangue").value,
    alergias: document.getElementById("alergias").value.trim(),
    historico: document.getElementById("historico").value.trim()
  };
}

function cpfJaExiste(cpf) {
  return pacientes.some(p => p.cpf === cpf && p.id !== idEmEdicao);
}

function salvarPaciente(evento) {
  evento.preventDefault();
  const dados = pegarDadosDoFormulario();

  if (cpfJaExiste(dados.cpf)) {
    mostrarMensagem("Já existe um paciente cadastrado com este CPF.", "erro");
    return;
  }

  if (idEmEdicao === null) {
    dados.id = gerarId();
    dados.status = "ativo";
    dados.plano = "";
    dados.cadastro = dataDeHoje();
    pacientes.push(dados);
    mostrarMensagem("Paciente cadastrado com sucesso.", "sucesso");
  } else {
    const paciente = pacientes.find(p => p.id === idEmEdicao);
    Object.assign(paciente, dados);
    mostrarMensagem("Dados do paciente atualizados.", "sucesso");
  }

  salvarLista(CHAVE_PACIENTES, pacientes);
  limparFormulario();
  listarPacientes();
}

function limparFormulario() {
  formulario.reset();
  idEmEdicao = null;
  document.getElementById("tituloFormulario").textContent = "Novo paciente";
  document.getElementById("botaoSalvar").textContent = "Cadastrar paciente";
  botaoCancelar.classList.add("escondido");
}

function editarPaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  idEmEdicao = id;

  document.getElementById("nome").value = paciente.nome;
  document.getElementById("cpf").value = paciente.cpf;
  document.getElementById("nascimento").value = paciente.nascimento;
  document.getElementById("sexo").value = paciente.sexo;
  document.getElementById("telefone").value = paciente.telefone;
  document.getElementById("convenio").value = paciente.convenio;
  document.getElementById("sangue").value = paciente.sangue;
  document.getElementById("alergias").value = paciente.alergias;
  document.getElementById("historico").value = paciente.historico;

  document.getElementById("tituloFormulario").textContent = "Editando: " + paciente.nome;
  document.getElementById("botaoSalvar").textContent = "Salvar alterações";
  botaoCancelar.classList.remove("escondido");
  formulario.scrollIntoView({ behavior: "smooth" });
}

function arquivarPaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  if (!confirm("Arquivar o registro de " + paciente.nome + "? Ele continuará guardado conforme as normas.")) {
    return;
  }
  paciente.status = "arquivado";
  salvarLista(CHAVE_PACIENTES, pacientes);
  if (idEmEdicao === id) {
    limparFormulario();
  }
  listarPacientes();
  mostrarMensagem("Registro arquivado conforme norma.", "sucesso");
}

function reativarPaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  paciente.status = "ativo";
  salvarLista(CHAVE_PACIENTES, pacientes);
  listarPacientes();
  mostrarMensagem("Paciente reativado.", "sucesso");
}

function excluirPaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  if (!confirm("Excluir definitivamente " + paciente.nome + " e todo o histórico? Esta ação não pode ser desfeita.")) {
    return;
  }
  pacientes = pacientes.filter(p => p.id !== id);
  registros = registros.filter(r => r.pacienteId !== id);
  salvarLista(CHAVE_PACIENTES, pacientes);
  salvarLista(CHAVE_REGISTROS, registros);
  if (idEmEdicao === id) {
    limparFormulario();
  }
  listarPacientes();
  mostrarMensagem("Registro removido definitivamente.", "sucesso");
}

function botoesDeAcao(paciente) {
  if (paciente.status === "ativo") {
    return `
      <a href="consultas.html?id=${paciente.id}" class="botao-pequeno">Prontuário</a>
      <button class="botao-pequeno" onclick="editarPaciente(${paciente.id})">Editar</button>
      <button class="botao-pequeno" onclick="arquivarPaciente(${paciente.id})">Arquivar</button>`;
  }
  return `
    <button class="botao-pequeno" onclick="reativarPaciente(${paciente.id})">Reativar</button>
    <button class="botao-pequeno botao-perigo" onclick="excluirPaciente(${paciente.id})">Excluir</button>`;
}

function listarPacientes() {
  const termo = campoBusca.value.trim().toLowerCase();
  const status = filtroStatus.value;
  const corpo = document.getElementById("corpoTabela");

  const filtrados = pacientes.filter(function (p) {
    const passaStatus = status === "todos" || p.status === status;
    const passaBusca = p.nome.toLowerCase().includes(termo) || p.cpf.includes(termo);
    return passaStatus && passaBusca;
  });

  corpo.innerHTML = "";
  filtrados.forEach(function (p) {
    let nome = protegerTexto(p.nome);
    if (p.status === "arquivado") {
      nome += ' <span class="etiqueta etiqueta-cinza">Arquivado</span>';
    }

    let alergia = "Nenhuma";
    if (p.alergias !== "") {
      alergia = `<span class="alerta-alergia">⚠ ${protegerTexto(p.alergias)}</span>`;
    }

    corpo.innerHTML += `
      <tr class="${p.status}">
        <td>${nome}</td>
        <td>${protegerTexto(p.cpf)}</td>
        <td>${calcularIdade(p.nascimento)} anos</td>
        <td>${protegerTexto(p.convenio)}</td>
        <td>${alergia}</td>
        <td class="acoes">${botoesDeAcao(p)}</td>
      </tr>`;
  });

  const aviso = document.getElementById("semResultados");
  if (filtrados.length === 0) {
    aviso.classList.remove("escondido");
  } else {
    aviso.classList.add("escondido");
  }
}

if (formulario !== null) {
  document.getElementById("nascimento").max = dataDeHoje();
  formulario.addEventListener("submit", salvarPaciente);
  botaoCancelar.addEventListener("click", limparFormulario);
  campoBusca.addEventListener("input", listarPacientes);
  filtroStatus.addEventListener("change", listarPacientes);
  listarPacientes();
}


// ==================================================================
// PARTE 3 — CONSULTAS E REGISTROS HOSPITALARES
// Prontuário, plano de tratamento e histórico (consultas.html)
// ==================================================================

let pacienteAtual = null;
let registroEmEdicao = null;

const selecao = document.getElementById("selecaoPaciente");
const formRegistro = document.getElementById("formRegistro");
const filtroTipo = document.getElementById("filtroTipo");

function preencherSelecao() {
  const ativos = pacientes.filter(p => p.status === "ativo");
  ativos.sort((a, b) => a.nome.localeCompare(b.nome));

  ativos.forEach(function (p) {
    selecao.innerHTML += `<option value="${p.id}">${protegerTexto(p.nome)} — ${protegerTexto(p.cpf)}</option>`;
  });
}

function abrirProntuario(id) {
  pacienteAtual = pacientes.find(p => p.id === id && p.status === "ativo");

  if (!pacienteAtual) {
    selecao.value = "";
    document.getElementById("prontuario").classList.add("escondido");
    document.getElementById("avisoInicial").classList.remove("escondido");
    return;
  }

  selecao.value = id;
  filtroTipo.value = "todos";
  document.getElementById("avisoInicial").classList.add("escondido");
  document.getElementById("prontuario").classList.remove("escondido");

  mostrarFicha();
  limparFormularioRegistro();
  listarRegistros();
}

function mostrarFicha() {
  const p = pacienteAtual;

  document.getElementById("fichaNome").textContent = p.nome;
  document.getElementById("fichaIdade").textContent = calcularIdade(p.nascimento) + " anos";
  document.getElementById("fichaSexo").textContent = p.sexo;
  document.getElementById("fichaCpf").textContent = p.cpf;
  document.getElementById("fichaSangue").textContent = p.sangue;
  document.getElementById("fichaConvenio").textContent = p.convenio;
  document.getElementById("fichaTelefone").textContent = p.telefone || "Não informado";
  document.getElementById("fichaCadastro").textContent = formatarData(p.cadastro);
  document.getElementById("fichaHistorico").textContent = p.historico || "Sem histórico registrado.";
  document.getElementById("plano").value = p.plano || "";

  const alerta = document.getElementById("alertaAlergia");
  if (p.alergias !== "") {
    alerta.textContent = "ALERGIA: " + p.alergias;
    alerta.classList.remove("escondido");
  } else {
    alerta.classList.add("escondido");
  }
}

function atualizarPlano() {
  pacienteAtual.plano = document.getElementById("plano").value.trim();
  salvarLista(CHAVE_PACIENTES, pacientes);
  mostrarMensagem("Plano de tratamento atualizado.", "sucesso");
}

function salvarRegistro(evento) {
  evento.preventDefault();

  const dados = {
    tipo: document.getElementById("tipo").value,
    data: document.getElementById("data").value,
    profissional: document.getElementById("profissional").value.trim(),
    situacao: document.getElementById("situacao").value,
    descricao: document.getElementById("descricao").value.trim()
  };

  if (registroEmEdicao === null) {
    dados.id = gerarId();
    dados.pacienteId = pacienteAtual.id;
    registros.push(dados);
    mostrarMensagem("Registro adicionado ao prontuário.", "sucesso");
  } else {
    const registro = registros.find(r => r.id === registroEmEdicao);
    Object.assign(registro, dados);
    mostrarMensagem("Registro atualizado.", "sucesso");
  }

  salvarLista(CHAVE_REGISTROS, registros);
  limparFormularioRegistro();
  listarRegistros();
}

function limparFormularioRegistro() {
  formRegistro.reset();
  registroEmEdicao = null;
  document.getElementById("data").value = dataDeHoje();
  document.getElementById("tituloRegistro").textContent = "Novo registro";
  document.getElementById("botaoRegistro").textContent = "Adicionar ao prontuário";
  document.getElementById("botaoCancelarRegistro").classList.add("escondido");
}

function editarRegistro(id) {
  const registro = registros.find(r => r.id === id);
  registroEmEdicao = id;

  document.getElementById("tipo").value = registro.tipo;
  document.getElementById("data").value = registro.data;
  document.getElementById("profissional").value = registro.profissional;
  document.getElementById("situacao").value = registro.situacao;
  document.getElementById("descricao").value = registro.descricao;

  document.getElementById("tituloRegistro").textContent = "Editando registro";
  document.getElementById("botaoRegistro").textContent = "Salvar alterações";
  document.getElementById("botaoCancelarRegistro").classList.remove("escondido");
  formRegistro.scrollIntoView({ behavior: "smooth" });
}

function excluirRegistro(id) {
  if (!confirm("Remover este registro do prontuário?")) {
    return;
  }
  registros = registros.filter(r => r.id !== id);
  salvarLista(CHAVE_REGISTROS, registros);
  if (registroEmEdicao === id) {
    limparFormularioRegistro();
  }
  listarRegistros();
  mostrarMensagem("Registro removido do prontuário.", "sucesso");
}

function listarRegistros() {
  const lista = document.getElementById("linhaDoTempo");
  const tipo = filtroTipo.value;

  const doPaciente = registros.filter(function (r) {
    const ehDoPaciente = r.pacienteId === pacienteAtual.id;
    const passaTipo = tipo === "todos" || r.tipo === tipo;
    return ehDoPaciente && passaTipo;
  });

  doPaciente.sort((a, b) => new Date(b.data) - new Date(a.data));

  if (doPaciente.length === 0) {
    lista.innerHTML = "<li class='vazio'>Nenhum registro encontrado.</li>";
    return;
  }

  lista.innerHTML = "";
  doPaciente.forEach(function (r) {
    const classeSituacao = r.situacao === "Em andamento" ? "andamento" : "concluido";
    lista.innerHTML += `
      <li class="registro ${classeSituacao}">
        <div class="registro-topo">
          <span class="etiqueta">${protegerTexto(r.tipo)}</span>
          <span class="situacao ${classeSituacao}">${protegerTexto(r.situacao)}</span>
          <span class="registro-data">${formatarData(r.data)}</span>
        </div>
        <p class="texto-clinico">${protegerTexto(r.descricao)}</p>
        <div class="registro-rodape">
          <span>${protegerTexto(r.profissional)}</span>
          <div>
            <button class="botao-pequeno" onclick="editarRegistro(${r.id})">Editar</button>
            <button class="botao-pequeno" onclick="excluirRegistro(${r.id})">Excluir</button>
          </div>
        </div>
      </li>`;
  });
}

if (formRegistro !== null) {
  selecao.addEventListener("change", function () {
    abrirProntuario(Number(selecao.value));
  });
  document.getElementById("botaoPlano").addEventListener("click", atualizarPlano);
  formRegistro.addEventListener("submit", salvarRegistro);
  document.getElementById("botaoCancelarRegistro").addEventListener("click", limparFormularioRegistro);
  filtroTipo.addEventListener("change", listarRegistros);

  preencherSelecao();

  const idDaUrl = new URLSearchParams(window.location.search).get("id");
  if (idDaUrl) {
    abrirProntuario(Number(idDaUrl));
  }
}
