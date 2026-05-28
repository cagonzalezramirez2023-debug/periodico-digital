// ============================================================
//  TRIVIA DEL CAOS NACIONAL — El Nopal Informado
// ============================================================

const preguntas = [
  {
    texto: "¿Cuántos presidentes mexicanos han prometido acabar con la corrupción desde 1980?",
    opciones: [
      "Todos los que han gobernado",
      "Solo los del PRI",
      "Solo los del PAN",
      "Ninguno, eso nunca se ha prometido"
    ],
    correcta: 0,
    explicacion: "✅ Correcto. Cada sexenio trae una promesa nueva, envuelta en un acrónimo diferente."
  },
  {
    texto: "¿Cuántas veces ha sido 'rescatado' Pemex con dinero público desde el año 2000?",
    opciones: ["2 veces", "5 veces", "En prácticamente cada gobierno", "Nunca, Pemex es superavitario"],
    correcta: 2,
    explicacion: "✅ Exacto. El rescate de Pemex es tan cíclico como el calendario azteca."
  },
  {
    texto: "¿Cuánto tiempo promedio espera un paciente para atención especializada en el IMSS en 2026?",
    opciones: [
      "1-2 semanas",
      "3-6 meses",
      "Lo que dure el sexenio",
      "El sistema de citas está actualizado, no hay espera"
    ],
    correcta: 1,
    explicacion: "✅ Correcto. Y eso si el médico especialista no está en paro técnico."
  },
  {
    texto: "¿Qué porcentaje del presupuesto federal terminó, históricamente, sin ejercerse o con 'sub-ejercicios'?",
    opciones: ["Menos del 1%", "Entre 5% y 20% en múltiples dependencias", "El presupuesto siempre se ejerce al 100%", "No existe esa información pública"],
    correcta: 1,
    explicacion: "✅ Así es. Los sub-ejercicios son el deporte nacional no-olímpico."
  },
  {
    texto: "¿Cuál es el único animal que aparece en el escudo nacional mexicano Y en el menú del taco de canasta promedio?",
    opciones: ["El águila", "La serpiente", "Ambos (dependiendo del puesto)", "Ninguno, eso sería ilegal"],
    correcta: 2,
    explicacion: "🌮 Respuesta correcta — y filosóficamente profunda. Ojo con lo que preguntas en taquería."
  }
];

let preguntaActual = 0;
let puntaje        = 0;
let respondida     = false;

// DOM refs
const preguntaNumEl   = document.getElementById("pregunta-num");
const preguntaTextoEl = document.getElementById("pregunta-texto");
const opcionesEl      = document.getElementById("opciones");
const feedbackEl      = document.getElementById("feedback");
const btnSiguiente    = document.getElementById("btn-siguiente");
const triviaContainer = document.getElementById("trivia-container");
const resultadoFinal  = document.getElementById("resultado-final");
const puntajeTexto    = document.getElementById("puntaje-texto");
const btnReiniciar    = document.getElementById("btn-reiniciar");
const barraProgreso   = document.getElementById("barra-progreso");

function actualizarBarra() {
  const pct = (preguntaActual / preguntas.length) * 100;
  if (barraProgreso) barraProgreso.style.width = pct + "%";
}

function cargarPregunta() {
  respondida = false;
  const q = preguntas[preguntaActual];

  preguntaNumEl.textContent   = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  preguntaTextoEl.textContent = q.texto;
  opcionesEl.innerHTML        = "";

  q.opciones.forEach((opcion, i) => {
    const btn       = document.createElement("button");
    btn.className   = "opcion";
    btn.textContent = opcion;
    btn.addEventListener("click", () => verificarRespuesta(i, btn));
    opcionesEl.appendChild(btn);
  });

  feedbackEl.textContent = "";
  feedbackEl.className   = "feedback oculto";
  btnSiguiente.classList.add("oculto");
  actualizarBarra();
}

function verificarRespuesta(indice, btnElegido) {
  if (respondida) return;
  respondida = true;

  const { correcta, explicacion, opciones } = preguntas[preguntaActual];
  document.querySelectorAll(".opcion").forEach(b => b.disabled = true);

  if (indice === correcta) {
    btnElegido.classList.add("correcto");
    feedbackEl.textContent = explicacion;
    feedbackEl.className   = "feedback ok";
    puntaje++;
  } else {
    btnElegido.classList.add("incorrecto");
    document.querySelectorAll(".opcion")[correcta].classList.add("correcto");
    feedbackEl.textContent = `❌ Incorrecto. La correcta: "${opciones[correcta]}". ${explicacion.replace("✅","💡").replace("🌮","")}`;
    feedbackEl.className   = "feedback mal";
  }

  feedbackEl.classList.remove("oculto");

  if (preguntaActual < preguntas.length - 1) {
    btnSiguiente.classList.remove("oculto");
  } else {
    setTimeout(mostrarResultado, 1400);
  }
}

btnSiguiente.addEventListener("click", () => {
  preguntaActual++;
  cargarPregunta();
});

function mostrarResultado() {
  // Barra al 100%
  if (barraProgreso) barraProgreso.style.width = "100%";

  triviaContainer.classList.add("oculto");
  resultadoFinal.classList.remove("oculto");

  const emojiEl = document.getElementById("resultado-emoji");

  let mensaje, emoji;
  if (puntaje === preguntas.length) {
    emoji   = "🏆";
    mensaje = `Puntaje perfecto: ${puntaje}/${preguntas.length}. Sabes más de política mexicana que la mayoría de los diputados. Considera postularte — o mejor no.`;
  } else if (puntaje >= 3) {
    emoji   = "🌵";
    mensaje = `${puntaje}/${preguntas.length} respuestas correctas. Ciudadano informado detectado. El sistema te tiene en la mira.`;
  } else if (puntaje >= 1) {
    emoji   = "📰";
    mensaje = `${puntaje}/${preguntas.length}. Prometedor. Sigue leyendo El Nopal Informado y eventualmente entenderás por qué todo sale mal.`;
  } else {
    emoji   = "🦅";
    mensaje = `0/${preguntas.length}. Oye, con ese nivel de desinformación tienes futuro en la política. ¿Has pensado en registrarte como candidato?`;
  }

  if (emojiEl) emojiEl.textContent = emoji;
  puntajeTexto.textContent = mensaje;
}

btnReiniciar.addEventListener("click", () => {
  preguntaActual = 0;
  puntaje        = 0;
  if (barraProgreso) barraProgreso.style.width = "0%";
  resultadoFinal.classList.add("oculto");
  triviaContainer.classList.remove("oculto");
  cargarPregunta();
});

// Inicio
cargarPregunta();
// ============================================================
//  MENÚ HAMBURGUESA
// ============================================================
(function () {
  const hamburger   = document.getElementById('hamburger');
  const navMenu     = document.getElementById('nav-menu');
  const navOverlay  = document.getElementById('nav-overlay');
  const navLinks    = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    navMenu.classList.add('nav-open');
    navOverlay.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    navMenu.classList.remove('nav-open');
    navOverlay.classList.remove('visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar al hacer click en overlay
  navOverlay.addEventListener('click', closeMenu);

  // Cerrar al hacer click en cualquier enlace del menú
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 820) closeMenu();
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Resetear al redimensionar a desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
})();
