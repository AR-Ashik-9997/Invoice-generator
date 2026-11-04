import { InvoiceDetailsProps } from "@/lib/types";

const InvoiceDetails = ({
    companyName,
    companyContact,
    invoiceNo,
    invoiceDate,
    setInvoiceDate,
    custName,
    setCustName,
    custPhone,
    setCustPhone,
    custAddress,
    setCustAddress
}: InvoiceDetailsProps) => {

    return (
        <>
            {/* Company & Invoice Header Section */}
            <div className="flex justify-between border-b-2 border-[#26334d] pb-4 mb-5 gap-4 flex-wrap header-section">
                <div className="flex-1 min-w-50">
                    <p className="w-full bg-transparent text-xl md:text-2xl font-extrabold  mb-1" style={{ color: '#14b8a6' }}>
                        {companyName}
                    </p>
                    <p className="w-full bg-transparent  text-sm text-inherit">
                        {companyContact}
                    </p>
                </div>
                <div className="flex flex-col items-end flex-1 min-w-45">
                    <h2 className="text-[#2563eb] text-lg font-bold mb-1">INVOICE / MEMO</h2>

                    <p className="bg-transparent text-xs text-right text-inherit py-0.5">
                        {invoiceNo}

                    </p>
                    <input
                        type="date"
                        className="bg-transparent  outline-none text-xs text-right text-inherit py-0.5 scheme-dark"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Customer Information Section */}
            <div className="space-y-4">
                {/* গ্রিড কন্টেইনার */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* ১. গ্রাহকের নাম */}
                    <div className="flex flex-col">
                        <label className="text-[11px] uppercase tracking-wider text-[#94a3b8] font-bold mb-1.5 flex items-center gap-1">
                            গ্রাহকের নাম <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b-2 border-[#26334d] focus:border-[#2563eb] transition-colors outline-none text-xs py-1.5 text-inherit placeholder:text-[#64748b]"
                            placeholder="কাস্টমারের নাম লিখুন"
                            value={custName}
                            onChange={(e) => setCustName(e.target.value)}
                            required
                        />
                    </div>

                    {/* ২. ফোন নম্বর */}
                    <div className="flex flex-col">
                        <label className="text-[11px] uppercase tracking-wider text-[#94a3b8] font-bold mb-1.5 flex items-center gap-1">
                            ফোন নম্বর <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            className="w-full bg-transparent border-b-2 border-[#26334d] focus:border-[#2563eb] transition-colors outline-none text-xs py-1.5 text-inherit placeholder:text-[#64748b]"
                            placeholder="০১৭XXXXXXXX"
                            value={custPhone}
                            onChange={(e) => setCustPhone(e.target.value)}
                            required
                        />
                    </div>

                    {/* ৩. ঠিকানা (Address) */}
                    <div className="flex flex-col">
                        <label className="text-[11px] uppercase tracking-wider text-[#94a3b8] font-bold mb-1.5 flex items-center gap-1">
                            ঠিকানা <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b-2 border-[#26334d] focus:border-[#2563eb] transition-colors outline-none text-xs py-1.5 text-inherit placeholder:text-[#64748b]"
                            placeholder="এলাকা, থানা, জেলা"
                            value={custAddress}
                            onChange={(e) => setCustAddress(e.target.value)}
                            required
                        />
                    </div>

                </div>
            </div>
        </>
    );
}
export default InvoiceDetails