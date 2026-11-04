/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoicePDFDocument } from '@/app/shared/generate_pdf';
import { pdf } from '@react-pdf/renderer';
import { createElement } from 'react';

export const calculateTotals = (items: { qty: number; price: number }[], charge: number, discount: number) => {
    const subTotal = items.reduce((acc, item) => acc + Number(item.qty || 0) * Number(item.price || 0), 0);
    const grandTotal = subTotal + charge - discount;
    return { subTotal, grandTotal };
};

// ১. কমন পেলোড তৈরির ফাংশন (কোড ডুপ্লিকেট এড়াতে)
const createMemoPayload = (
    invoiceNo: string,
    custName: string,
    custPhone: string,
    custAddress: string,
    invoiceDate: string,
    charge: number,
    discount: number,
    grandTotal: number,
    items: any[],
    companyName: string,
    companyContact: string
) => ({
    inv_no: invoiceNo,
    cust_name: custName,
    phone: custPhone,
    address: custAddress,
    date: invoiceDate,
    charge,
    discount,
    total: grandTotal,
    items: items.map((item) => ({
        ...item,
        qty: Number(item.qty),
        price: Number(item.price)
    })),
    company_name: companyName,
    company_contact: companyContact
});

// ২. শুধু PDF Blob জেনারেট করে রিটার্ন করার জন্য (WhatsApp বা Supabase আপলোডের জন্য)
export const generatePDFBlob = async (
    invoiceNo: string,
    custName: string,
    custPhone: string,
    custAddress: string,
    invoiceDate: string,
    charge: number,
    discount: number,
    grandTotal: number,
    items: any[],
    companyName: string,
    companyContact: string
): Promise<Blob> => {
    const memoPayload = createMemoPayload(
        invoiceNo, custName, custPhone, custAddress, invoiceDate,
        charge, discount, grandTotal, items, companyName, companyContact
    );

    const pdfDocument = createElement(InvoicePDFDocument, { memoPayload }) as Parameters<typeof pdf>[0];
    const blob = await pdf(pdfDocument).toBlob();
    return blob;
};

// ৩. লোকাল ব্রাউজারে ডাউনলোড করার জন্য মূল ফাংশন
export const generateAndDownloadPDF = async (
    invoiceNo: string,
    custName: string,
    custPhone: string,
    custAddress: string,
    invoiceDate: string,
    charge: number,
    discount: number,
    grandTotal: number,
    items: any[],
    companyName: string,
    companyContact: string,
    setIsPdfPrinting: (val: boolean) => void
) => {
    setIsPdfPrinting(true);
    try {
        const blob = await generatePDFBlob(
            invoiceNo, custName, custPhone, custAddress, invoiceDate,
            charge, discount, grandTotal, items, companyName, companyContact
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${invoiceNo || 'Invoice'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('PDF export error:', error);
    } finally {
        setIsPdfPrinting(false);
    }
};