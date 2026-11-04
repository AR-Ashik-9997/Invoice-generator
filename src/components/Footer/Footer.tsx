import React from 'react';
import { FooterProps } from '@/lib/types';

const Footer: React.FC<FooterProps> = ({ isPdfPrinting }) => {
    return (
        <div className={`w-full mt-10 pt-6 px-4 sm:px-8 transition-all duration-300 ${isPdfPrinting
            ? 'bg-white text-black'
            : 'bg-[#0f172a] text-[#f8fafc]'
            }`}>

            {/* Signature Section - Responsive Flex/Grid with proper spacing */}
            <div className="flex justify-between items-end pt-12 pb-6 px-4 sm:px-12">
                {/* Customer Signature */}
                <div className="text-center">
                    <div className={`w-28 sm:w-36 border-t mx-auto mb-1.5 ${isPdfPrinting ? 'border-gray-400' : 'border-[#475569]'}`} />
                    <p className={`text-xs font-medium ${isPdfPrinting ? 'text-gray-700' : 'text-gray-300'}`}>
                        গ্রাহকের স্বাক্ষর
                    </p>
                </div>

                {/* Authority Signature */}
                <div className="text-center">
                    <div className={`w-28 sm:w-36 border-t mx-auto mb-1.5 ${isPdfPrinting ? 'border-gray-400' : 'border-[#475569]'}`} />
                    <p className={`text-xs font-medium ${isPdfPrinting ? 'text-gray-700' : 'text-gray-300'}`}>
                        কর্তৃপক্ষের স্বাক্ষর
                    </p>
                </div>
            </div>

            {/* Footer Note / Branding */}
            <div className={`mt-4 py-4 text-center text-xs border-t ${isPdfPrinting
                ? 'text-gray-400 border-gray-100'
                : 'text-gray-400 border-[#26334d]'
                }`}>
                ধন্যবাদ আবার আসিবেন! <span className="mx-1">•</span> <span className={`font-semibold ${isPdfPrinting ? 'text-gray-500' : 'text-gray-300'}`}>Powered by Security Tech CCTV Solutions</span>
            </div>

        </div>
    );
};


export default Footer;