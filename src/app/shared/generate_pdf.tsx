import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1e293b'
  },

  // Header Style
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    borderBottomColor: '#0d9488',
    paddingBottom: 10,
    marginBottom: 12
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d9488',
    marginBottom: 2
  },
  subText: {
    fontSize: 8.5,
    color: '#64748b',
    maxWidth: 230,
    lineHeight: 1.3
  },
  invoiceBadge: {
    backgroundColor: '#f0fdfa',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccfbf1',
    alignSelf: 'flex-end',
    marginBottom: 4
  },
  invoiceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0d9488',
    textAlign: 'right',
    textTransform: 'uppercase'
  },
  invoiceMetaText: {
    fontSize: 8.5,
    color: '#475569',
    textAlign: 'right',
    marginTop: 1
  },

  // Professional Customer Card Design
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  infoColumn: {
    flex: 1,
    paddingRight: 8
  },
  label: {
    fontSize: 7.5,
    color: '#64748b',
    marginBottom: 3,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  value: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0f172a'
  },

  // Table Structure
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontWeight: 'bold',
    fontSize: 8.5
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 6,
    paddingHorizontal: 6,
    alignItems: 'center'
  },
  tableRowEven: {
    backgroundColor: '#f8fafc'
  },

  // Totals Section
  totalsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12
  },
  totalsContainer: {
    width: '45%',
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 9,
    color: '#475569'
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    paddingTop: 4,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#0d9488'
  },

  // Signatures
  sigSection: {
    position: 'absolute',
    bottom: 88,
    left: 25,
    right: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  sigLine: {
    width: 130,
    borderTopWidth: 1,
    borderTopColor: '#94a3b8',
    textAlign: 'center',
    paddingTop: 4,
    fontSize: 8.5,
    color: '#475569'
  },

  // Footer
  footer: {
    position: 'absolute', 
    bottom: 25,           
    left: 25,             
    right: 25,            
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 6,
    fontSize: 7.5,
    color: '#64748b'
  }
});

interface InvoicePDFProps {
  memoPayload: {
    company_name?: string;
    company_contact?: string;
    inv_no?: string;
    date?: string;
    cust_name?: string;
    phone?: string;
    address?: string;
    items?: Array<{ name?: string; desc?: string; qty?: number; price?: number }>;
    charge?: number | string;
    discount?: number | string;
    total?: number;
  };
}

export const InvoicePDFDocument: React.FC<InvoicePDFProps> = ({ memoPayload }) => {
  const subTotal = memoPayload.items?.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0) || 0;
  const charge = Number(memoPayload.charge || 0);
  const discount = Number(memoPayload.discount || 0);
  const grandTotal = subTotal + charge - discount;

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>

        {/* Header */}
        <View style={pdfStyles.headerContainer}>
          <View>
            <Text style={pdfStyles.companyName}>{memoPayload.company_name || 'Security Tech CCTV Solutions'}</Text>
            <Text style={pdfStyles.subText}>{memoPayload.company_contact || 'Purbatengry Hospital road ishwardi, pabna'}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={pdfStyles.invoiceBadge}>
              <Text style={pdfStyles.invoiceTitle}>INVOICE / MEMO</Text>
            </View>
            <Text style={[pdfStyles.invoiceMetaText, { fontWeight: 'bold', color: '#0f172a' }]}>
              {memoPayload.inv_no || 'INV-2026-1001'}
            </Text>
            <Text style={pdfStyles.invoiceMetaText}>{memoPayload.date || '03-Nov-2026'}</Text>
          </View>
        </View>

        {/* Professional Customer & Address Info Card */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#f8fafc',
          borderRadius: 6,
          padding: 10,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#e2e8f0',
          borderLeftWidth: 4,
          borderLeftColor: '#0d9488', // Left accent bar
        }}>
          {/* Column 1: Customer Name */}
          <View style={{ flex: 2.2, paddingRight: 8 }}>
            <Text style={pdfStyles.label}>Customer Name</Text>
            <Text style={pdfStyles.value}>{memoPayload.cust_name || 'Customer Name'}</Text>
          </View>

          {/* Column 2: Phone Number */}
          <View style={{
            flex: 1.8,
            borderLeftWidth: 1,
            borderLeftColor: '#cbd5e1',
            paddingLeft: 10,
            paddingRight: 8
          }}>
            <Text style={pdfStyles.label}>Phone Number</Text>
            <Text style={pdfStyles.value}>{memoPayload.phone || '017XXXXXXXX'}</Text>
          </View>

          {/* Column 3: Address */}
          <View style={{
            flex: 3,
            borderLeftWidth: 1,
            borderLeftColor: '#cbd5e1',
            paddingLeft: 10
          }}>
            <Text style={pdfStyles.label}>Address</Text>
            <Text style={[pdfStyles.value, { fontWeight: 'normal', color: '#334155' }]}>
              {memoPayload.address || 'Customer Address'}
            </Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={pdfStyles.tableHeader}>
          <Text style={{ flex: 0.5, textAlign: 'center' }}>#</Text>
          <Text style={{ flex: 3.5, paddingLeft: 6 }}>Item Name & Description</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>Qty</Text>
          <Text style={{ flex: 1.2, textAlign: 'right' }}>Price (BDT)</Text>
          <Text style={{ flex: 1.3, textAlign: 'right', paddingRight: 6 }}>Total (BDT)</Text>
        </View>

        {/* Table Rows */}
        {memoPayload.items?.map((item, index) => {
          const qty = Number(item.qty || 0);
          const price = Number(item.price || 0);
          const itemTotal = qty * price;
          const isEven = index % 2 === 1;

          return (
            <View key={index} style={[pdfStyles.tableRow, isEven ? pdfStyles.tableRowEven : {}]}>
              <Text style={{ flex: 0.5, textAlign: 'center', color: '#64748b' }}>{index + 1}</Text>
              <Text style={{ flex: 3.5, paddingLeft: 6, fontWeight: 'medium' }}>{item.name || item.desc || 'Item'}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{qty}</Text>
              <Text style={{ flex: 1.2, textAlign: 'right', color: '#334155' }}>{price.toLocaleString()}</Text>
              <Text style={{ flex: 1.3, textAlign: 'right', paddingRight: 6, fontWeight: 'bold' }}>{itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
            </View>
          );
        })}

        {/* Totals Summary */}
        <View style={pdfStyles.totalsWrapper}>
          <View style={pdfStyles.totalsContainer}>
            <View style={pdfStyles.totalRow}>
              <Text>Subtotal:</Text>
              <Text>BDT {subTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={pdfStyles.totalRow}>
              <Text>Installation & Fittings:</Text>
              <Text>BDT {charge.toLocaleString()}</Text>
            </View>
            <View style={pdfStyles.totalRow}>
              <Text>Discount:</Text>
              <Text style={{ color: '#d97706' }}>BDT {discount.toLocaleString()}</Text>
            </View>
            <View style={pdfStyles.grandTotalRow}>
              <Text>Grand Total:</Text>
              <Text>BDT {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
            </View>
          </View>
        </View>

        {/* Signatures */}
        <View style={pdfStyles.sigSection}>
          <Text style={pdfStyles.sigLine}>Customer Signature</Text>
          <Text style={pdfStyles.sigLine}>Authorized Signature</Text>
        </View>

        {/* Footer */}
        <View style={pdfStyles.footer} fixed>
          <Text>Thank you for your business! • Powered by Security Tech CCTV Solutions</Text>
        </View>

      </Page>
    </Document>
  );
};