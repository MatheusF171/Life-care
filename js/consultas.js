let pacientes = lerLista(CHAVE_PACIENTES);
let registros = lerLista(CHAVE_REGISTROS);
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
    alerta.textContent = "⚠ ALERGIA: " + p.alergias;
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
