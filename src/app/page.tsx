/* eslint-disable react/no-unescaped-entities */
'use client';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import InvoiceDetails from '@/components/InvoiceDetails/InvoiceDetails';
import ItemPresets from '@/components/ItemPresets/ItemPresets';
import ItemTable from '@/components/ItemTable/ItemTable';
import TotalsSummary from '@/components/TotalsSummary/TotalsSummary';
import Footer from '@/components/Footer/Footer';
import { useInvoiceManager } from '@/hooks/useInvoiceManager';

const CCTVInvoiceApp = () => {
  const {
    items, companyName, companyContact, invoiceNo, invoiceDate, setInvoiceDate,
    custName, setCustName, custPhone, setCustPhone, custAddress, setCustAddress,
    charge, setCharge, discount, setDiscount, savedMemos, sidebarOpen, setSidebarOpen,
    searchTerm, setSearchTerm, isPdfPrinting, isSaved, isSaving, memoPaperRef,
    addRow, addPreset, deleteRow, updateItem, subTotal, grandTotal,
    saveMemo, loadMemo, deleteMemo, resetMemo, exportPDF, shareWhatsApp, shareEmail
  } = useInvoiceManager();

  return (
    <div className="bg-[#0b1120] text-[#f8fafc] h-screen overflow-hidden flex flex-col font-sans">
      {/* Header Section */}
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        resetMemo={resetMemo}
        saveMemo={saveMemo}
        exportPDF={exportPDF}
        shareWhatsApp={shareWhatsApp}
        shareEmail={shareEmail}
        isSaved={isSaved}
        isSaving={isSaving}
      />

      {/* Main App Workspace Layout (Fixed height, sidebar fixed, inner workspace scrolls) */}
      <div className="flex flex-1 relative overflow-hidden h-[calc(100vh-61px)]">
        {/* Sidebar Section - Fixed and non-scrolling body */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          savedMemos={savedMemos.map(m => ({ ...m, custName: m.cust_name, invNo: m.inv_no }))}
          loadMemo={loadMemo}
          deleteMemo={deleteMemo}
        />

        {/* Workspace Center Section - Only this section scrolls when items increase */}
        <div className="flex-1 h-full overflow-y-auto p-3 sm:p-6 flex flex-col items-center">
          {!isSaved && (
            <div className="w-full max-w-212.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-md mb-3 text-xs flex items-center justify-between shrink-0">
              <span>⚠️ শেয়ার বা ডাউনলোড করার আগে দয়া করে 'সেভ করুন' বাটনে ক্লিক করে ডেটাবেজে সংরক্ষণ করুন।</span>
            </div>
          )}

          {/* Invoice Paper Canvas Section */}
          <div
            ref={memoPaperRef}
            className={`w-full max-w-212.5 border border-[#26334d] rounded-lg p-5 sm:p-8 shadow-2xl transition-all duration-300 ${isPdfPrinting
              ? 'bg-white text-black! border-none shadow-none'
              : 'bg-[#0f172a] text-[#f8fafc]'
              }`}
          >
            <InvoiceDetails
              companyName={companyName}
              companyContact={companyContact}
              invoiceNo={invoiceNo}
              invoiceDate={invoiceDate}
              setInvoiceDate={setInvoiceDate}
              custName={custName}
              setCustName={setCustName}
              custPhone={custPhone}
              setCustPhone={setCustPhone}
              custAddress={custAddress}
              setCustAddress={setCustAddress}
            />

            {!isPdfPrinting && <ItemPresets addPreset={addPreset} />}

            <ItemTable
              items={items}
              updateItem={updateItem}
              deleteRow={deleteRow}
              addRow={addRow}
            />

            <TotalsSummary
              subTotal={subTotal}
              charge={charge}
              setCharge={setCharge}
              discount={discount}
              setDiscount={setDiscount}
              grandTotal={grandTotal}
            />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CCTVInvoiceApp