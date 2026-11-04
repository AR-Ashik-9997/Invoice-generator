import { ItemTableProps } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

const ItemTable = ({ items, updateItem, deleteRow, addRow }: ItemTableProps) => {
    return (
        <>
            {/* Items Table Section */}
            <div className="w-full overflow-x-auto mb-4">
                <table className="w-full border-collapse min-w-125">
                    <thead>
                        <tr className="bg-white/3 text-[10px] uppercase font-bold text-[#94a3b8]">
                            <th className="border border-[#26334d] p-2 w-8.75 text-center">#</th>
                            <th className="border border-[#26334d] p-2 text-left">পণ্যের নাম ও বিবরণ</th>
                            <th className="border border-[#26334d] p-2 w-17.5 text-center">পরিমাণ</th>
                            <th className="border border-[#26334d] p-2 w-22.5 text-right">দর (৳)</th>
                            <th className="border border-[#26334d] p-2 w-25 text-right">মোট (৳)</th>
                            <th className="border border-[#26334d] p-2 w-8.75 btn-del-row text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="text-xs">
                                <td className="border border-[#26334d] p-2 text-center text-[#94a3b8]">
                                    {index + 1}
                                </td>
                                <td className="border border-[#26334d] p-2">
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-none text-inherit"
                                        placeholder="পণ্যের বিবরণ"
                                        value={item.name}
                                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                                    />
                                </td>
                                <td className="border border-[#26334d] p-2">
                                    <input
                                        type="number"
                                        className="w-full bg-transparent outline-none text-center text-inherit"
                                        value={item.qty}
                                        onChange={(e) => updateItem(index, 'qty', e.target.value)}
                                    />
                                </td>
                                <td className="border border-[#26334d] p-2">
                                    <input
                                        type="number"
                                        className="w-full bg-transparent outline-none text-right text-inherit"
                                        value={item.price}
                                        onChange={(e) => updateItem(index, 'price', e.target.value)}
                                    />
                                </td>
                                <td className="border border-[#26334d] p-2 text-right">
                                    ৳ {(Number(item.qty || 0) * Number(item.price || 0)).toFixed(2)}
                                </td>
                                <td className="border border-[#26334d] p-2 text-center btn-del-row">
                                    <button
                                        type="button"
                                        aria-label="Delete Item Row"
                                        onClick={() => deleteRow(index)}
                                        className="text-[#ef4444] hover:opacity-80 transition cursor-pointer"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Item Action Section */}
            <button
                type="button"
                onClick={() => addRow()}
                className="px-3 py-1.5 rounded text-xs font-semibold border border-[#26334d] text-[#f8fafc] hover:bg-white/5 inline-flex items-center gap-1 mb-5 btn-del-row transition cursor-pointer"
            >
                <Plus size={13} /> আইটেম যোগ করুন
            </button>
        </>
    );
}

export default ItemTable