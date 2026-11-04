import { TotalsSummaryProps } from "@/lib/types";


const TotalsSummary = ({
    subTotal,
    charge,
    setCharge,
    discount,
    setDiscount,
    grandTotal
}: TotalsSummaryProps) => {
    return (
        <div className="flex justify-end">
            {/* Totals Summary Calculation Box */}
            <div className="w-65 flex flex-col gap-1.5 text-xs">
                {/* Subtotal Row */}
                <div className="flex justify-between items-center text-[#94a3b8]">
                    <span>সাবটোটাল:</span>
                    <span className="text-inherit">৳ {subTotal.toFixed(2)}</span>
                </div>

                {/* Installation & Fitting Charges Row */}
                <div className="flex justify-between items-center">
                    <span className="text-[#94a3b8]">ইনস্টলেশন ও ফিটিংস:</span>
                    <input
                        type="number"
                        className="w-20 bg-transparent border-b border-[#26334d] focus:border-[#2563eb] outline-none text-right text-inherit py-0.5"
                        value={charge}
                        onChange={(e) => setCharge(parseFloat(e.target.value) || 0)}
                    />
                </div>

                {/* Discount Row */}
                <div className="flex justify-between items-center">
                    <span className="text-[#94a3b8]">ডিসকাউন্ট:</span>
                    <input
                        type="number"
                        className="w-20 bg-transparent border-b border-[#26334d] focus:border-[#2563eb] outline-none text-right text-inherit py-0.5"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    />
                </div>

                {/* Grand Total Row */}
                <div className="flex justify-between items-center text-sm font-extrabold text-[#10b981] border-t-2 border-[#26334d] pt-2 mt-1">
                    <span>সর্বমোট:</span>
                    <span>৳ {grandTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
export default TotalsSummary