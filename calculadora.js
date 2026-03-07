// ============================================
// CONTADOR DE VISITAS
// ============================================

// Función para incrementar y mostrar el contador de visitas
function updateVisitCounter() {
    // Obtener el contador actual del almacenamiento local
    let visits = localStorage.getItem('visitCount');
    
    // Si no existe, inicializar en 0
    if (visits === null) {
        visits = 0;
    }
    
    // Incrementar el contador
    visits = parseInt(visits) + 1;
    
    // Guardar el nuevo valor
    localStorage.setItem('visitCount', visits);
    
    // Mostrar en la página
    document.getElementById('visitCounter').textContent = visits;
}

// Ejecutar cuando cargue la página
window.addEventListener('load', updateVisitCounter);


// ============================================
// CALCULADORA


// Variables globales para la calculadora
let current = '0';      // Número que se está ingresando actualmente
let previous = '';      // Número anterior (antes del operador)
let operator = null;    // Operador seleccionado (+, -, *, /)

// Obtener referencias a los elementos del DOM
const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');

/**
 * Actualiza la pantalla de la calculadora
 * Muestra el número actual y la operación pendiente
 */
function updateDisplay() {
    currentDisplay.textContent = current;
    previousDisplay.textContent = previous + (operator ? ' ' + operator : '');
}

/**
 * Agrega un número o punto decimal al display
 * @param {string} num - El número o '.' a agregar
 */
function appendNumber(num) {
    // Evitar múltiples puntos decimales
    if (num === '.' && current.includes('.')) return;
    
    // Si el display muestra '0' y no se presiona '.', reemplazar el 0
    if (current === '0' && num !== '.') {
        current = num;
    } else {
        // Agregar el número al final
        current += num;
    }
    updateDisplay();
}

/**
 * Establece el operador matemático
 * @param {string} op - El operador (+, -, *, /)
 */
function setOperator(op) {
    // Si ya hay un operador y un número actual, calcular primero
    if (operator !== null && current !== '') {
        calculate();
    }
    
    // Permitir cambiar el operador sin número nuevo
    if (current === '' && previous !== '') {
        operator = op;
        updateDisplay();
        return;
    }
    
    // Establecer el operador y mover current a previous
    operator = op;
    previous = current;
    current = '';
    updateDisplay();
}

/**
 * Realiza el cálculo matemático
 * Ejecuta la operación entre previous y current
 */
function calculate() {
    // Validar que tenemos todos los datos necesarios
    if (operator === null || previous === '' || current === '') return;
    
    // Convertir strings a números flotantes
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result;
    
    // Realizar la operación según el operador
    switch(operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            // Validar división por cero
            if (curr === 0) {
                result = 'Error';
            } else {
                result = prev / curr;
            }
            break;
        default:
            return;
    }
    
    // Actualizar el display con el resultado
    current = result.toString();
    operator = null;
    previous = '';
    updateDisplay();
}

/**
 * Limpia toda la calculadora
 * Resetea todos los valores a su estado inicial
 */
function clearAll() {
    current = '0';
    previous = '';
    operator = null;
    updateDisplay();
}

/**
 * Borra el último dígito ingresado
 * Funciona como la tecla backspace
 */
function deleteLast() {
    // Si hay más de un carácter, eliminar el último
    if (current.length > 1) {
        current = current.slice(0, -1);
    } else {
        // Si solo hay un carácter, volver a 0
        current = '0';
    }
    updateDisplay();
}


// ============================================
// SOPORTE DE TECLADO
// ============================================

/**
 * Maneja los eventos del teclado
 * Permite usar la calculadora con el teclado físico
 */
document.addEventListener('keydown', function(e) {
    // Números del 0 al 9
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    }
    
    // Punto decimal
    if (e.key === '.') {
        appendNumber('.');
    }
    
    // Operadores
    if (e.key === '+') {
        setOperator('+');
    }
    if (e.key === '-') {
        setOperator('-');
    }
    if (e.key === '*') {
        setOperator('*');
    }
    if (e.key === '/') {
        e.preventDefault(); // Evitar búsqueda rápida en navegadores
        setOperator('/');
    }
    
    // Enter o = para calcular
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    
    // Escape para limpiar
    if (e.key === 'Escape') {
        clearAll();
    }
    
    // Backspace para borrar último dígito
    if (e.key === 'Backspace') {
        deleteLast();
    }
});


// ============================================
// NAVEGACIÓN SUAVE
// ============================================

/**
 * Scroll suave al hacer clic en los enlaces de navegación
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});