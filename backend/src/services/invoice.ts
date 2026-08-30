import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { IOrder } from '../models/types';
import { ProductModel } from '../models';

const INVOICE_DIR = path.join(__dirname, '../../.data/invoices');

export const generateInvoicePDF = async (order: IOrder): Promise<string> => {
  if (!fs.existsSync(INVOICE_DIR)) {
    fs.mkdirSync(INVOICE_DIR, { recursive: true });
  }

  const filePath = path.join(INVOICE_DIR, `invoice_${order.id}.pdf`);
  
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      // Top colored accent bar
      doc.rect(0, 0, 612, 15).fill('#1E3A8A'); // Dark Blue

      // Header block
      doc.y = 40;
      doc.fillColor('#1E3A8A').fontSize(22).font('Helvetica-Bold').text('INVOICE', { align: 'right' });
      doc.moveUp(1.2);
      doc.fontSize(18).fillColor('#1F2937').font('Helvetica-Bold').text('Rahul Super Mart');
      
      doc.fontSize(8.5).fillColor('#4B5563').font('Helvetica');
      doc.text('Vishal Telecom Pvt LTD, Sikta Bazar, W. Champaran Bihar, 845307');
      doc.text('Email: vishalstoresikta@gmail.com | GSTIN: Mock12345B2B');

      doc.moveDown(1.5);
      doc.strokeColor('#E5E7EB').lineWidth(1.5).moveTo(50, doc.y).lineTo(562, doc.y).stroke();
      doc.moveDown(1.5);

      // Info block (Bill to left, Invoice details right)
      const detailsY = doc.y;
      
      // Left: Bill To
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#1F2937').text('BILL TO:', 50, detailsY);
      doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#111827').text(order.businessName, 50, detailsY + 15);
      doc.fontSize(8.5).font('Helvetica').fillColor('#4B5563').text(`Address: ${order.deliveryAddress}\nPin Code: ${order.pincode}`, 50, detailsY + 30, { width: 220 });

      // Right: Invoice Metadata
      const rightX = 350;
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#4B5563').text('Invoice Details', rightX, detailsY);
      doc.fontSize(8.5).font('Helvetica').fillColor('#1F2937');
      doc.text(`Invoice No:`, rightX, detailsY + 15, { continued: true }).font('Helvetica-Bold').text(` INV-${(order.id || '').toUpperCase()}`);
      doc.font('Helvetica').text(`Invoice Date:`, rightX, detailsY + 28, { continued: true }).font('Helvetica-Bold').text(` ${new Date(order.createdAt || Date.now()).toLocaleDateString()}`);
      doc.font('Helvetica').text(`Order Status:`, rightX, detailsY + 41, { continued: true }).font('Helvetica-Bold').text(` ${(order.orderStatus || 'received').toUpperCase()}`);
      doc.font('Helvetica').text(`Payment Method:`, rightX, detailsY + 54, { continued: true }).font('Helvetica-Bold').text(` ${(order.paymentMethod || 'online').toUpperCase()}`);
      doc.font('Helvetica').text(`Payment Status:`, rightX, detailsY + 67, { continued: true }).font('Helvetica-Bold').text(` ${(order.paymentStatus || 'pending').toUpperCase()}`);

      doc.y = detailsY + 95;
      
      // Table Header
      const tableHeaderY = doc.y;
      doc.rect(50, tableHeaderY, 512, 22).fill('#F3F4F6');
      
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#1F2937');
      doc.text('Item Description', 60, tableHeaderY + 6);
      doc.text('MRP', 250, tableHeaderY + 6, { width: 55, align: 'right' });
      doc.text('Rate (INR)', 315, tableHeaderY + 6, { width: 65, align: 'right' });
      doc.text('Qty', 390, tableHeaderY + 6, { width: 45, align: 'right' });
      doc.text('Total (INR)', 465, tableHeaderY + 6, { width: 90, align: 'right' });

      doc.y = tableHeaderY + 28;

      // Table Body
      for (const item of order.items) {
        const itemY = doc.y;
        if (itemY > 680) {
          doc.addPage();
          // Draw header accent on new page
          doc.rect(0, 0, 612, 15).fill('#1E3A8A');
          doc.y = 40;
        }

        // Fetch product MRP details
        const product = await ProductModel.findById(item.productId);
        const mrp = product ? product.mrp : item.price; // Fallback to rate price if not found

        doc.fontSize(8.5).font('Helvetica').fillColor('#374151');
        doc.text(item.name, 60, doc.y, { width: 180 });
        doc.text(mrp.toFixed(2), 250, itemY, { width: 55, align: 'right' });
        doc.text(item.price.toFixed(2), 315, itemY, { width: 65, align: 'right' });
        doc.text(item.quantity.toString(), 390, itemY, { width: 45, align: 'right' });
        doc.text(item.subtotal.toFixed(2), 465, itemY, { width: 90, align: 'right' });

        doc.moveDown(1.2);
        // Subtle divider line between items
        doc.strokeColor('#F3F4F6').lineWidth(0.5).moveTo(50, doc.y).lineTo(562, doc.y).stroke();
        doc.moveDown(0.5);
      }

      // Totals Section
      doc.moveDown(1);
      doc.strokeColor('#D1D5DB').lineWidth(1).moveTo(50, doc.y).lineTo(562, doc.y).stroke();
      doc.moveDown(1);

      let currentY = doc.y;
      
      const drawSummaryLine = (label: string, value: string, isTotal = false) => {
        doc.fontSize(isTotal ? 10.5 : 8.5)
           .font(isTotal ? 'Helvetica-Bold' : 'Helvetica')
           .fillColor(isTotal ? '#111827' : '#4B5563');
        
        doc.text(label, 280, currentY, { width: 175, align: 'right' });
        doc.text(value, 465, currentY, { width: 90, align: 'right' });
        currentY += isTotal ? 22 : 16;
      };

      drawSummaryLine('Subtotal:', order.amounts.subtotal.toFixed(2));

      if (order.amounts.codCharge && order.amounts.codCharge > 0) {
        drawSummaryLine('COD Handling Charge:', order.amounts.codCharge.toFixed(2));
      }

      if (order.amounts.discount && order.amounts.discount > 0) {
        const couponText = order.couponCode ? ` (Coupon: ${order.couponCode})` : '';
        drawSummaryLine(`Discount${couponText}:`, `-${order.amounts.discount.toFixed(2)}`);
      }

      if (order.amounts.promoDeduction && order.amounts.promoDeduction > 0) {
        drawSummaryLine('Promo Wallet Deduction:', `-${order.amounts.promoDeduction.toFixed(2)}`);
      }

      if (order.amounts.shipping && order.amounts.shipping > 0) {
        drawSummaryLine('Shipping Charge:', order.amounts.shipping.toFixed(2));
      }

      currentY += 4;
      doc.strokeColor('#E5E7EB').lineWidth(1).moveTo(330, currentY).lineTo(562, currentY).stroke();
      currentY += 8;

      drawSummaryLine('Grand Total:', `INR ${order.amounts.finalTotal.toFixed(2)}`, true);

      if (order.paymentMethod === 'wallet') {
        doc.strokeColor('#E5E7EB').lineWidth(1).moveTo(330, currentY).lineTo(562, currentY).stroke();
        currentY += 8;
        drawSummaryLine('Paid via B2B Wallet Ledger:', `-${order.amounts.finalTotal.toFixed(2)}`);
        drawSummaryLine('Balance Due:', 'INR 0.00', true);
      }

      // Footer - Terms & Conditions
      doc.fontSize(7.5).font('Helvetica').fillColor('#9CA3AF');
      doc.text('Terms & Conditions:\n1. Goods once sold will not be returned unless damaged or incorrect.\n2. All disputes are subject to W. Champaran, Bihar jurisdiction.\n3. This is a computer-generated invoice and requires no physical signature.', 50, 710, { width: 512, lineGap: 2 });

      doc.end();

      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', err => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
