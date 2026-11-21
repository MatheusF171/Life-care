const pacientes = lerLista(CHAVE_PACIENTES);
const registros = lerLista(CHAVE_REGISTROS);

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

mostrarDataDeHoje();
atualizarCartoes();
mostrarAlertas();
mostrarUltimosRegistros();
