import { SidebarProps } from '@/lib/types';
import { Search, Trash2 } from 'lucide-react';


const Sidebar = ({
    sidebarOpen,
    searchTerm,
    setSearchTerm,
    savedMemos,
    loadMemo,
    deleteMemo
}: SidebarProps) => {
    // Filter saved memos based on search term
    const filteredMemos = savedMemos.filter(m =>
        `${m.cust_name} ${m.inv_no} ${m.total}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside
            className={`fixed md:relative top-15.25 md:top-0 left-0 bottom-0 z-40 w-72 bg-[#151e32] border-r border-[#26334d] flex flex-col h-[calc(100vh-61px)] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
        >
            {/* Sidebar Search Section */}
            <div className="p-3.5 border-b border-[#26334d]">
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                        type="text"
                        className="w-full pl-8 pr-3 py-2 bg-[#0b1120] border border-[#26334d] rounded-md text-xs text-white focus:outline-none focus:border-[#2563eb]"
                        placeholder="🔍 মেমো খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Sidebar Memos List Section */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
                {filteredMemos.map((m) => (
                    <div
                        key={m.id}
                        onClick={() => loadMemo(m.id)}
                        className="p-3 bg-white/2 border border-[#26334d] rounded-lg cursor-pointer hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition relative group"
                    >
                        <div className="flex justify-between items-center text-xs font-semibold text-white mb-1">
                            <span>{m.cust_name}</span>
                            <span className="text-[#10b981]">{m.total}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-[#94a3b8]">
                            <span>{m.inv_no}</span>
                            <span>{m.date}</span>
                        </div>
                        <div className="flex justify-end gap-1 mt-2">
                            <button
                                type="button"
                                aria-label="Delete Memo"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteMemo(m.id,`public/invoice-${m.inv_no}.pdf`);
                                }}
                                className="p-1 text-[#ef4444] hover:bg-[#ef4444]/10 rounded transition cursor-pointer"
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
export default Sidebar