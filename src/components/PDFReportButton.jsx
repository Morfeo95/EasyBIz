import React from 'react';
import html2canvas from 'html2canvas'; // Library to capture DOM elements as images
import jsPDF from 'jspdf'; // Library to generate PDF documents
import useTranslations from '../hooks/useTranslations'; // Custom hook for handling translations

// Component to create a PDF report from UI content and provided data
const PDFReportButton = ({ results, productName, currency, gastosPlanta, insumos }) => {
  const messages = useTranslations(); // Load translation messages for internationalization

  // If translations aren't loaded yet, show a disabled button with a loading message
  if (!messages) return <button disabled>Loading...</button>;

  // Function to generate and save the PDF report
  const generatePDF = async () => {
    const input = document.getElementById('pdf-container'); // Get the container to capture for the PDF
    if (!input) {
      console.error('Container with id "pdf-container" not found'); // Log an error if the container doesn't exist
      return;
    }

    // Store the original styles to restore them after PDF generation
    const originalClassName = input.className;
    const originalStyle = input.style.cssText;

    // Apply large-screen styles to the container for better PDF layout
    input.className = 'grid md:grid-cols-3 gap-4'; // Use a grid layout suitable for large screens
    input.style.width = '1600px'; // Set a fixed width to simulate a wide screen
    input.style.maxWidth = 'none'; // Remove any maximum width restrictions
    input.style.height = 'auto'; // Adjust height dynamically based on content
    input.style.position = 'relative'; // Ensure proper positioning during capture

    // Wait briefly to allow React to apply style changes before capturing
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // Capture the container as an image using html2canvas
      const canvas = await html2canvas(input, {
        scale: 1.5, // Increase resolution for better image quality
        width: 1600, // Match the width set above
        height: input.scrollHeight, // Capture the full height of the content
        windowWidth: 1600, // Simulate a wide browser window
        useCORS: true, // Allow loading of external images (e.g., in charts) if present
      });

      const imgData = canvas.toDataURL('image/png'); // Convert the captured canvas to a PNG image
      const pdf = new jsPDF('l', 'mm', 'a4'); // Create a new PDF document in landscape mode (A4 size)
      const margin = 10; // Set a 10mm margin for the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2; // Calculate usable width within margins
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Scale height to maintain aspect ratio

      // Add the captured image to the PDF document
      pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);

      // Add a watermark to the bottom-right corner of the PDF
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(10); // Set font size for the watermark
      pdf.setTextColor(150, 150, 150); // Use a light gray color for subtlety
      pdf.text(
        messages.pdfReportButton.watermark, // Watermark text from translations
        pageWidth - margin, // Position near the right edge
        pageHeight - margin, // Position near the bottom
        { align: 'right' } // Align text to the right
      );

      // Save the PDF with a filename based on productName, or default to "report"
      pdf.save(`${productName || 'report'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error); // Log any errors during PDF creation
    } finally {
      // Restore the original styles to the container to avoid affecting the UI
      input.className = originalClassName;
      input.style.cssText = originalStyle;
    }
  };

  return (
    // Button to trigger PDF generation, styled as an underlined link
    <button
      onClick={generatePDF} // Call generatePDF when clicked
      data-html2canvas-ignore="true" // Prevent this button from being included in the PDF capture
      className="text-green-700 font-bold underline bg-transparent border-0 cursor-pointer focus:outline-none no-print"
    >
      {messages.pdfReportButton.generate}  
    </button>
  );
};

export default PDFReportButton; // Export the component for use in other parts of the app