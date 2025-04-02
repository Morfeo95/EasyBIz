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
      // Capture the container as an image using html2canvas
      const canvas = await html2canvas(input, {
        scale: 1.5, // Increase resolution for better image quality
        width: 1600, // Match the width set above
        height: input.scrollHeight, // Capture the full height of the content
        windowWidth: 1600, // Simulate a wide browser window
        useCORS: true, // Allow loading of external images (e.g., in charts) if present
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
      // Offset hacia arriba (24px) para evitar cortar filas a la mitad
      const upwardOffset = 24;

      // Calcula la cantidad total de páginas (se descuenta el offset en las páginas posteriores)
      let totalPages = Math.ceil((canvas.height - upwardOffset) / pageCanvasHeight);
      
      for (let page = 0; page < totalPages; page++) {
        let yOrigin = page * pageCanvasHeight;
        if (page > 0) {
          yOrigin = page * pageCanvasHeight - upwardOffset;
        }
        let segmentCanvasHeight = Math.min(
          pageCanvasHeight + (page > 0 ? upwardOffset : 0),
          canvas.height - yOrigin
        );
        
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
      }
      
      // Agregar watermark en la esquina inferior derecha de la última página
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        messages.pdfReportButton.watermark,
        pageWidth - margin,
        pageHeight - margin,
        { align: 'right' }
      );
      
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
