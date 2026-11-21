const CHAVE_PACIENTES = "lifecare_pacientes";
const CHAVE_REGISTROS = "lifecare_registros";
const CHAVE_TEMA = "lifecare_tema";

let temporizadorMensagem;

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

document.getElementById("botaoTema").addEventListener("click", alternarTema);
criarDadosIniciais();
aplicarTema();
