/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HeaderProps {
    toggleSidebar: () => void;
    resetMemo: () => void;
    saveMemo: () => void;
    exportPDF: () => void;
    shareWhatsApp: () => void;
    shareEmail: () => void;
    isSaved: boolean;
    isSaving: boolean;
}

// export interface InvoiceDetailsProps {
//     companyName: string;
//     companyContact: string;
//     invoiceNo: string;
//     invoiceDate: string;
//     setInvoiceDate: (val: string) => void;
//     custName: string;
//     setCustName: (val: string) => void;
//     custPhone: string;
//     setCustPhone: (val: string) => void;
// }
export interface InvoiceDetailsProps {
    companyName: string;
    companyContact: string;
    invoiceNo: string;
    invoiceDate: string;
    setInvoiceDate: (date: string) => void;
    custName: string;
    setCustName: (name: string) => void;
    custPhone: string;
    setCustPhone: (phone: string) => void;
    custAddress: string;          // নতুন
    setCustAddress: (addr: string) => void; // নতুন
}

export interface ItemPresetsProps {
    addPreset: (name: string, price: number) => void;
}

export interface Item {
    name: string;
    qty: number | string;
    price: number | string;
}

export interface ItemTableProps {
    items: Item[];
    updateItem: (index: number, field: keyof Item, value: any) => void;
    deleteRow: (index: number) => void;
    addRow: (name?: string, qty?: number, price?: number) => void;
}

export interface MemoItem {
    address: string;
    id: string;
    inv_no: string;
    cust_name: string;
    phone?: string;
    date: string;
    charge?: number | string;
    discount?: number | string;
    total: string;
    items: Array<{ name: string; qty: number | string; price: number | string }>;
    companyName?: string;
    companyContact?: string;
    file_path: string,     // স্টোরেজ থেকে ফাইল ডিলিট করার সময় লাগবে
    file_url: string,

}

export interface SidebarProps {
    sidebarOpen: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    savedMemos: MemoItem[];
    loadMemo: (id: string) => void;
    deleteMemo: (id: string, filePath: string) => void;
}

export interface TotalsSummaryProps {
    subTotal: number;
    charge: number;
    setCharge: (val: number) => void;
    discount: number;
    setDiscount: (val: number) => void;
    grandTotal: number;
}

export interface Item {
    name: string;
    qty: number | string;
    price: number | string;
}

export interface FooterProps {
    isPdfPrinting?: boolean;
}
