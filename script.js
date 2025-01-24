const workTime = 25 * 60; // 25 minutos en segundos
const breakTime = 5 * 60; // 5 minutos en segundos
let timeLeft = workTime; // Tiempo inicial
let timerInterval = null; // Variable para el intervalo
let isWorking = true; // Estado del temporizador (trabajo o descanso)

// Elementos del DOM
const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeSelector = document.getElementById('mode');

// Función para iniciar el temporizador
function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000); // Inicia el temporizador
    startButton.disabled = true;
    pauseButton.disabled = false;
    modeSelector.disabled = true; // Desactiva el selector mientras está en ejecución
  }
}

// Función para pausar el temporizador
function pauseTimer() {
  clearInterval(timerInterval); // Detiene el temporizador
  timerInterval = null;
  startButton.disabled = false;
  pauseButton.disabled = true;
  modeSelector.disabled = false; // Reactiva el selector
}

// Función para reiniciar el temporizador
function resetTimer() {
  clearInterval(timerInterval); // Detiene el temporizador
  timerInterval = null;
  updateMode(); // Actualiza el modo seleccionado
  updateDisplay(); // Muestra el estado inicial
  startButton.disabled = false;
  pauseButton.disabled = true;
  modeSelector.disabled = false; // Reactiva el selector
}

// Función para actualizar el temporizador
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--; // Decrementa el tiempo restante
  } else {
    // Cambia el estado cuando el tiempo se acaba
    isWorking = !isWorking;
    timeLeft = isWorking ? workTime : breakTime;
    updateBackground();
  }
  updateDisplay(); // Actualiza la pantalla
}

// Función para actualizar la pantalla
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60); // Calcula los minutos restantes
  const seconds = timeLeft % 60; // Calcula los segundos restantes
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  statusDisplay.textContent = isWorking ? 'Tiempo de Trabajo' : 'Tiempo de Descanso';
}

// Función para cambiar el fondo dinámicamente
function updateBackground() {
  document.body.style.backgroundColor = isWorking ? 'var(--work-color)' : 'var(--break-color)';
}

// Función para actualizar el tiempo según el modo seleccionado
function updateMode() {
  if (modeSelector.value === 'work') {
    isWorking = true;
    timeLeft = workTime; // 25 minutos para trabajo
    statusDisplay.textContent = 'Tiempo de Trabajo';
  } else {
    isWorking = false;
    timeLeft = breakTime; // 5 minutos para descanso
    statusDisplay.textContent = 'Tiempo de Descanso';
  }
  updateDisplay(); // Muestra el tiempo correcto
}

// Event listeners para los botones
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Event listener para cambiar el modo
modeSelector.addEventListener('change', updateMode);

// Inicializar la pantalla
updateMode(); // Actualiza el tiempo y el estado inicial según el modo seleccionado
updateDisplay();
