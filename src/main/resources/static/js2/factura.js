class Factura {
  constructor(numero, cliente, items) {
    this.numero = numero;
    this.cliente = cliente;
    this.items = items;
  }
  
  calcularTotal() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].precio * this.items[i].cantidad;
    }
    return total;
  }
  
  generarFacturaHTML() {
    const facturaElement = document.getElementById('factura');
    facturaElement.innerHTML = `
      <h2>Factura #${this.numero}</h2>
      <p>Cliente: ${this.cliente}</p>
      <h3>Items:</h3>
      <ul>
        ${this.items.map(item => `<li>${item.nombre} x ${item.cantidad} - $${item.precio}</li>`).join('')}
      </ul>
      <h3>Total: $${this.calcularTotal()}</h3>
    `;
  }
  
  descargarFacturaPDF() {
    const facturaElement = document.getElementById('factura');
    const facturaHTML = facturaElement.innerHTML;

    // Crear un objeto jsPDF
    const pdf = new jsPDF();

    // Agregar el contenido HTML convertido a PDF
    pdf.fromHTML(facturaHTML, 15, 15, {}, () => {
      // Descargar el archivo PDF
      pdf.save(`factura_${this.numero}.pdf`);
    });
  }
}

// Datos de ejemplo
const items = [
  { nombre: "Producto 1", precio: 10, cantidad: 2 },
  { nombre: "Producto 2", precio: 5, cantidad: 3 },
  { nombre: "Producto 3", precio: 8, cantidad: 1 }
];

// Crear una instancia de la clase Factura
const factura = new Factura(1, "John Doe", items);

// Generar la factura en HTML
factura.generarFacturaHTML();

// Escuchar el evento clic del botón de descarga
const descargarBtn = document.getElementById('descargar-btn');
descargarBtn.addEventListener('click', () => {
  factura.descargarFacturaPDF();
});