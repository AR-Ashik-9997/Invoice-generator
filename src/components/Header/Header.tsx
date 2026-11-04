import { HeaderProps } from '@/lib/types';
import { Video, Menu, Plus, Save, FileDown, Send, Mail } from 'lucide-react';

const Header = ({
    toggleSidebar,
    resetMemo,
    saveMemo,
    exportPDF,
    shareWhatsApp,
    shareEmail,
    isSaved,
    isSaving
}: HeaderProps) => {
    return (
        <header className="bg-[#151e32] border-b border-[#26334d] px-5 py-3 flex justify-between items-center sticky top-0 z-50 flex-wrap gap-3">
            {/* Header Left Section / Branding */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    aria-label="Toggle Sidebar"
                    className="md:hidden text-white p-1 hover:bg-slate-700 rounded"
                    onClick={toggleSidebar}
                >
                    <Menu size={20} />
                </button>

                <div className="text-[#2563eb] bg-[#2563eb]/15 p-2 rounded-lg">
                    <Video size={24} />
                </div>

                <div>
                    <h1 className="text-base font-bold text-white leading-tight">
                        CCTV Memo Studio
                    </h1>
                    <p className="text-xs text-[#94a3b8]">Supabase Cloud Sync</p>
                </div>
            </div>

            {/* Header Right Section / Actions */}
            <div className="flex items-center gap-2 flex-wrap">
                <button
                    type="button"
                    onClick={resetMemo}
                    className="px-3 py-2 rounded-md text-xs font-semibold border border-[#26334d] text-[#f8fafc] hover:bg-white/5 inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                    <Plus size={14} /> নতুন মেমো
                </button>

                <button
                    type="button"
                    disabled={isSaving}
                    onClick={saveMemo}
                    className={`px-3.5 py-2 rounded-md text-xs font-semibold text-white inline-flex items-center gap-1.5 transition shadow-lg shadow-emerald-900/20 ${isSaving
                        ? 'bg-[#059669] opacity-60 cursor-not-allowed'
                        : 'bg-[#10b981] hover:bg-[#059669] cursor-pointer'
                        }`}
                >
                    <Save size={14} /> {isSaving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                </button>

                <button
                    type="button"
                    disabled={!isSaved}
                    onClick={exportPDF}
                    className={`px-3 py-2 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition ${isSaved
                        ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
                        }`}
                >
                    <FileDown size={14} /> PDF ডাউনলোড
                </button>

                <button
                    type="button"
                    disabled={!isSaved}
                    onClick={shareWhatsApp}
                    className={`px-3 py-2 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition ${isSaved
                        ? 'bg-[#25D366] hover:bg-[#1da851] text-white cursor-pointer'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
                        }`}
                >
                    <Send size={14} /> WhatsApp
                </button>

                <button
                    type="button"
                    disabled={!isSaved}
                    onClick={shareEmail}
                    className={`px-3 py-2 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition ${isSaved
                        ? 'bg-[#ea4335] hover:bg-[#c53326] text-white cursor-pointer'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
                        }`}
                >
                    <Mail size={14} /> Email
                </button>

                {/* <button
                    type="button"
                    disabled={!isSaved}
                    onClick={() => window.print()}
                    className={`px-3 py-2 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition ${isSaved
                        ? 'border border-[#26334d] text-[#f8fafc] hover:bg-white/5 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
                        }`}
                >
                    <Printer size={14} /> প্রিন্ট
                </button> */}
            </div>
        </header>
    );
}
export default Header;