import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useTranslations from '../hooks/useTranslations';

const PDFReportButton = ({ results, productName, currency, gastosPlanta, insumos }) => {
  const messages = useTranslations();
  if (!messages) return <button disabled>Loading...</button>;

  const generatePDF = async () => {
    const input = document.getElementById('pdf-container');
    if (!input) {
      console.error('Container with id "pdf-container" not found');
      return;
    }

    // Clonar el contenedor para evitar modificar el DOM original
    const clonedInput = input.cloneNode(true);
    clonedInput.style.width = '1600px';
    clonedInput.style.maxWidth = 'none';
    clonedInput.style.height = 'auto';
    clonedInput.style.position = 'absolute';
    clonedInput.style.top = '-9999px';
    document.body.appendChild(clonedInput);

    // Aumentamos el tiempo de espera (1500 ms) para asegurar que todo el contenido esté renderizado
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Capturamos el contenedor como imagen usando html2canvas
      const canvas = await html2canvas(input, {
        scale: 1.5, // Aumenta la resolución para mayor calidad
        width: 1600, // Coincide con el ancho establecido
        height: input.scrollHeight, // Captura la altura completa del contenido
        windowWidth: 1600, // Simula una ventana ancha del navegador
        useCORS: true, // Permite cargar imágenes externas si las hay
      });
      
      const imgData = canvas.toDataURL('image/png');

      // Configuración del PDF en landscape, tamaño A4
      const pdf = new jsPDF('l', 'mm', 'a4');
      const margin = 10;
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const pdfPageHeight = pdf.internal.pageSize.getHeight() - margin * 2;
      
      // Ratio para convertir píxeles del canvas a unidades del PDF
      const ratio = canvas.width / pdfWidth;
      // Altura en píxeles del canvas que equivale a una página PDF
      const pageCanvasHeight = pdfPageHeight * ratio;
      // Offset de 24px que se va a eliminar de la parte inferior de cada página
      const offsetToRemove = 24;

      // Calcula la cantidad total de páginas (se descuenta el offset en las páginas posteriores)
      let totalPages = Math.ceil((canvas.height - offsetToRemove) / pageCanvasHeight);
      
      // Variables fijas para la posición de la marca de agua
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let page = 0; page < totalPages; page++) {
        // Calcular la posición de origen para cada página
        let yOrigin = page * pageCanvasHeight;
        if (page > 0) {
          yOrigin = page * pageCanvasHeight - offsetToRemove;
        }
        let segmentCanvasHeight = Math.min(
          pageCanvasHeight + (page > 0 ? offsetToRemove : 0),
          canvas.height - yOrigin
        );
        // Eliminar los últimos 24px de cada página
        segmentCanvasHeight = segmentCanvasHeight - offsetToRemove;
        
        // Crear un canvas temporal para el segmento actual
        const canvasPage = document.createElement('canvas');
        canvasPage.width = canvas.width;
        canvasPage.height = segmentCanvasHeight;
        const ctx = canvasPage.getContext('2d');
        ctx.drawImage(
          canvas,
          0,
          yOrigin,
          canvas.width,
          segmentCanvasHeight,
          0,
          0,
          canvas.width,
          segmentCanvasHeight
        );
        
        const pageImgData = canvasPage.toDataURL('image/png');
        const segmentPdfHeight = (canvasPage.height * pdfWidth) / canvas.width;
        
        if (page > 0) pdf.addPage();
        pdf.addImage(pageImgData, 'PNG', margin, margin, pdfWidth, segmentPdfHeight);

        // Agregar la marca de agua en la misma posición en cada página
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          messages.pdfReportButton.watermark,
          pageWidth - margin,
          pageHeight - margin,
          { align: 'right' }
        );
      }
      
      pdf.save(`${productName || 'report'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Eliminar el clon del DOM para limpiar
      document.body.removeChild(clonedInput);
    }
  };

  return (
    <button
      onClick={generatePDF}
      data-html2canvas-ignore="true"
      className="text-green-700 font-bold underline bg-transparent border-0 cursor-pointer focus:outline-none no-print"
    >
      {messages.pdfReportButton.generate}
    </button>
  );
};

export default PDFReportButton;
