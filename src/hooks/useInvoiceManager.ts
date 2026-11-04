/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { createElement, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { Item, MemoItem } from '@/lib/types';
import { invoiceSchema } from '@/lib/validations';
import { deleteMemoFromSupabase, fetchMemosFromSupabase } from '@/lib/memoService';
import { calculateTotals, generateAndDownloadPDF, generatePDFBlob } from '@/lib/memoUtils';



const DEFAULT_ITEMS: Item[] = [
    { name: '2MP HD Dome Camera', qty: 2, price: 1500 },
    { name: '2MP HD Bullet Camera', qty: 1, price: 1600 },
    { name: '4 Channel XVR / DVR', qty: 1, price: 3500 },
    { name: '1TB Surveillance Hard Disk', qty: 1, price: 4200 },
    { name: '12V 10A Power Supply Box', qty: 1, price: 1200 }
];

export const useInvoiceManager = () => {
    const [items, setItems] = useState<Item[]>(DEFAULT_ITEMS);
    const [companyName, setCompanyName] = useState<string>('Security Tech CCTV Solutions');
    const [companyContact, setCompanyContact] = useState<string>('Purbatengry Hospital road ishwardi, pabna');
    const [invoiceNo, setInvoiceNo] = useState<string>('');
    const [invoiceDate, setInvoiceDate] = useState<string>('');
    const [custName, setCustName] = useState<string>('');
    const [custPhone, setCustPhone] = useState<string>('');
    const [custAddress, setCustAddress] = useState<string>('');
    const [publicURL, setPublicURL] = useState<string>('');
    const [charge, setCharge] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);

    const [currentMemoId, setCurrentMemoId] = useState<string | null>(null);
    const [savedMemos, setSavedMemos] = useState<MemoItem[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isPdfPrinting, setIsPdfPrinting] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const memoPaperRef = useRef<HTMLDivElement>(null);
    const isSavingRef = useRef(false);
    const draftRevisionRef = useRef(0);
    const draftIdentityRef = useRef(0);

    const invalidateDraftRevision = () => {
        draftRevisionRef.current += 1;
    };

    const updateInvoiceDate = (value: string) => {
        invalidateDraftRevision();
        setInvoiceDate(value);
        setIsSaved(false);
    };

    const updateCustName = (value: string) => {
        invalidateDraftRevision();
        setCustName(value);
        setIsSaved(false);
    };

    const updateCustPhone = (value: string) => {
        invalidateDraftRevision();
        setCustPhone(value);
        setIsSaved(false);
    };

    const updateCustAddress = (value: string) => {
        invalidateDraftRevision();
        setCustAddress(value);
        setIsSaved(false);
    };

    const updateCharge = (value: number) => {
        invalidateDraftRevision();
        setCharge(value);
        setIsSaved(false);
    };

    const updateDiscount = (value: number) => {
        invalidateDraftRevision();
        setDiscount(value);
        setIsSaved(false);
    };

    useEffect(() => {
        const generatedNo = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        setInvoiceNo(generatedNo);
        setInvoiceDate(new Date().toISOString().split('T')[0]);
        fetchMemosFromSupabase(setSavedMemos);
    }, []);

    const addRow = (name: string = '', qty: number = 1, price: number = 0) => {
        invalidateDraftRevision();
        setItems((prev) => [...prev, { name, qty: Number(qty), price: Number(price) }]);
        setIsSaved(false);
    };

    const addPreset = (name: string, price: number) => addRow(name, 1, price);

    const deleteRow = (index: number) => {
        invalidateDraftRevision();
        setItems((prev) => prev.filter((_, i) => i !== index));
        setIsSaved(false);
    };

    const updateItem = (index: number, field: keyof Item, value: any) => {
        invalidateDraftRevision();
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
        setIsSaved(false);
    };

    const { subTotal, grandTotal } = calculateTotals(
        items.map((item) => ({ ...item, qty: Number(item.qty), price: Number(item.price) })),
        charge,
        discount
    );


    const saveMemo = async () => {
        if (isSavingRef.current) return;
        const saveRevision = draftRevisionRef.current;
        const saveDraftIdentity = draftIdentityRef.current;

        const validationResult = invoiceSchema.safeParse({ custName, custPhone, custAddress });

        if (!validationResult.success) {
            toast.error(`⚠️ ${validationResult.error.issues[0].message}`);
            return;
        }

        isSavingRef.current = true;
        setIsSaving(true);

        try {
            const id = currentMemoId || `MEMO-${Date.now()}`;

            const blob = await generatePDFBlob(
                invoiceNo, custName, custPhone, custAddress, invoiceDate,
                charge, discount, grandTotal, items, companyName, companyContact
            );

            if (!blob) {
                alert('PDF তৈরি করতে সমস্যা হয়েছে।');
                return;
            }
            const fileName = `invoice-${invoiceNo}.pdf`;
            const filePath = `public/${fileName}`;
            const { error: uploadError } = await supabase.storage
                .from('invoices')
                .upload(filePath, blob, {
                    contentType: 'application/pdf',
                    upsert: true
                });

            if (uploadError) {
                console.error('PDF Upload Error:', uploadError);
                alert('PDF আপলোড করতে সমস্যা হয়েছে: ' + uploadError.message);
                return;
            }
            const { data: urlData } = supabase.storage
                .from('invoices')
                .getPublicUrl(filePath);

            const pdfUrl = urlData.publicUrl;

            // ৬. ডাটাবেজে সেভ করার জন্য পেলালোড তৈরি (file_path এবং file_url সহ)
            const memoPayload = {
                id,
                inv_no: invoiceNo,
                cust_name: custName,
                phone: custPhone,
                address: custAddress,
                date: invoiceDate,
                charge,
                discount,
                total: `৳ ${grandTotal.toFixed(2)}`,
                items,
                company_name: companyName,
                company_contact: companyContact,
                file_path: filePath,
                file_url: pdfUrl
            };
            const { error: dbError } = await supabase.from('memos').upsert(memoPayload);

            if (dbError) {
                toast.error('ডেটাবেজে সেভ করতে সমস্যা হয়েছে: ' + dbError.message);
            } else {
                if (saveDraftIdentity === draftIdentityRef.current) {
                    setCurrentMemoId(id);
                    if (saveRevision === draftRevisionRef.current) {
                        setPublicURL(pdfUrl);
                        setIsSaved(true);
                    }
                }
                toast.success('🎉 মেমো এবং পিডিএফ ফাইল সফলভাবে সেভ হয়েছে!');
                fetchMemosFromSupabase(setSavedMemos);
            }

        } catch (error: any) {
            console.error('Save Memo Error:', error);
            toast.error('সংরক্ষণ করার সময় একটি ত্রুটি ঘটেছে।');
        } finally {
            isSavingRef.current = false;
            setIsSaving(false);
        }
    };
    const loadMemo = (id: string) => {
        const memo = savedMemos.find((m) => m.id === id);
        if (!memo) return;

        invalidateDraftRevision();
        draftIdentityRef.current += 1;
        setCurrentMemoId(memo.id);
        setInvoiceNo(memo.inv_no);
        setCustName(memo.cust_name);
        setCustPhone(memo.phone || '');
        setCustAddress(memo.address || '');
        setInvoiceDate(memo.date);
        setCharge(Number(memo.charge) || 0);
        setDiscount(Number(memo.discount) || 0);
        setItems(memo.items || []);
        if (memo.companyName) setCompanyName(memo.companyName);
        if (memo.companyContact) setCompanyContact(memo.companyContact);
        setPublicURL(memo.file_url)
        setIsSaved(true);
        toast.info('মেমো লোড করা হয়েছে');
    };

    const deleteMemo = async (id: string, filePath: string) => {
        if (!confirm('মেমোটি মুছে ফেলতে চান?')) return;
        try {
            await deleteMemoFromSupabase(id, filePath, () => {
                toast.success('মেমো এবং ফাইল সফলভাবে মুছে ফেলা হয়েছে');
                fetchMemosFromSupabase(setSavedMemos);
                if (currentMemoId === id) resetMemo();
            });
        } catch {
            toast.error('ডিলিট করতে সমস্যা হয়েছে');
        }
    };

    const resetMemo = () => {
        invalidateDraftRevision();
        draftIdentityRef.current += 1;
        setCurrentMemoId(null);
        setPublicURL('');
        setCustName('');
        setCustPhone('');
        setCustAddress('');
        setInvoiceNo(`INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
        setCharge(0);
        setDiscount(0);
        setItems(DEFAULT_ITEMS);
        setIsSaved(false);
    };

    const exportPDF = () => generateAndDownloadPDF(
        invoiceNo, custName, custPhone, custAddress, invoiceDate,
        charge, discount, grandTotal, items, companyName, companyContact, setIsPdfPrinting
    );


    const shareWhatsApp = () => {
        if (!isSaved) return;
        const text = `অভিনন্দন! ${custName}, আপনার CCTV ইনভয়েস (${invoiceNo}) এর ডিজিটাল কপি দেখতে নিচের লিংকে ক্লিক করুন:\n\n${publicURL}\n\nসর্বমোট বিল: ৳ ${grandTotal.toFixed(2)}`;

        const cleanPhone = custPhone ? custPhone.replace(/\D/g, '') : '';
        const formattedPhone = cleanPhone.startsWith('88') ? cleanPhone : '88' + cleanPhone;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${custPhone ? formattedPhone : ''}&text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');

    };

    const shareEmail = () => {
        if (!isSaved) return;
        const subject = `Invoice # ${invoiceNo} from ${companyName || 'CCTV Services'}`;
        const body = `Dear ${custName || 'Valued Customer'},
        Thank you for choosing ${companyName || 'CCTV Services'}. We appreciate your business!
        Your invoice #${invoiceNo} for the CCTV services provided is now ready.

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        💰 Total Amount Due: ৳ ${grandTotal.toFixed(2)}
        📅 Invoice Date: ${invoiceDate}
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        🔗 View or Download Your Digital Invoice:
        ${publicURL}
        If you have any questions regarding this invoice or need further assistance, please feel free to contact us.

        Best regards,

        ${companyName || 'CCTV Services Team'}

        ${companyContact || ''}`;

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
    };

    return {
        items, companyName, companyContact, invoiceNo, invoiceDate, setInvoiceDate: updateInvoiceDate,
        custName, setCustName: updateCustName, custPhone, setCustPhone: updateCustPhone,
        custAddress, setCustAddress: updateCustAddress,
        charge, setCharge: updateCharge, discount, setDiscount: updateDiscount, savedMemos, sidebarOpen, setSidebarOpen,
        searchTerm, setSearchTerm, isPdfPrinting, isSaved, setIsSaved, isSaving, memoPaperRef,
        addRow, addPreset, deleteRow, updateItem, subTotal, grandTotal,
        saveMemo, loadMemo, deleteMemo, resetMemo, exportPDF, shareWhatsApp, shareEmail
    };
};