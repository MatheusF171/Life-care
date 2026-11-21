let pacientes = lerLista(CHAVE_PACIENTES);
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
  const registros = lerLista(CHAVE_REGISTROS).filter(r => r.pacienteId !== id);
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

formulario.addEventListener("submit", salvarPaciente);
botaoCancelar.addEventListener("click", limparFormulario);
campoBusca.addEventListener("input", listarPacientes);
filtroStatus.addEventListener("change", listarPacientes);

listarPacientes();
