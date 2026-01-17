import { jsPDF } from "jspdf"

// interface QRCodeExportProps {
//     huntTitle: string;
//     huntId?: string;
// }

export function exportQRCodePDF(huntTitle: string) {
    const doc = new jsPDF();

    // We can't easily grab the SVG from DOM in this disconnected function way without rendering it.
    // Ideally we render the SVG to a canvas/image then add to PDF.
    // For MVP, we'll just add text and maybe a placeholder rect, 
    // OR we render the QRCode component hidden, get data URL.
    // Let's keep it simple: We will just add the Access Code text big and bold.

    doc.setFontSize(22);
    doc.text(huntTitle, 20, 20);

    doc.setFontSize(16);
    doc.text("Scan to Start / Code d'accès :", 20, 40);

    doc.setFontSize(40);
    doc.setTextColor(0, 0, 255);
    doc.text("HUNT-1234", 20, 60); // Mock code

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Imprimez cette page et collez-la au point de départ.", 20, 90);

    doc.save("start-code.pdf");
}

export default function QRCodeExport() {
    return null; // Logic moved to utility function trigger
}
