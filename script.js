if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  let visitas = localStorage.getItem('visitas') || 0;
  visitas++;
  localStorage.setItem('visitas', visitas);
  document.getElementById('contador').textContent = visitas;
} else {
  // Solo muestra el valor actual sin aumentar
  let visitas = localStorage.getItem('visitas') || 0;
  document.getElementById('contador').textContent = visitas;
}