import { ItemPresetsProps } from "@/lib/types";

const ItemPresets = ({ addPreset }: ItemPresetsProps) => {
    const presets = [
        { name: '2MP HD Bullet Camera', price: 1600, label: '+ Bullet Cam' },
        { name: '2MP HD Dome Camera', price: 1500, label: '+ Dome Cam' },
        { name: '4MP IP ColorVu Camera', price: 3800, label: '+ ColorVu' },
        { name: '5MP HD Outdoor Camera', price: 2500, label: '+ 5MP Cam' },
        { name: '4 Channel XVR / DVR', price: 3500, label: '+ 4CH DVR' },
        { name: '8 Channel XVR / DVR', price: 5500, label: '+ 8CH DVR' },
        { name: '16 Channel XVR / DVR', price: 9500, label: '+ 16CH DVR' },
        { name: '4 Channel POE NVR', price: 4800, label: '+ 4CH NVR' },
        { name: '8 Channel POE NVR', price: 7200, label: '+ 8CH NVR' },
        { name: '1TB Surveillance Hard Disk', price: 4200, label: '+ 1TB HDD' },
        { name: '2TB Surveillance Hard Disk', price: 6500, label: '+ 2TB HDD' },
        { name: '4TB Surveillance Hard Disk', price: 9800, label: '+ 4TB HDD' },
        { name: 'Cat6 Cable Roll (305 Meter)', price: 4500, label: '+ Cat6 Roll' },
        { name: 'Coaxial Cable (Copper Wire)', price: 25, label: '+ Coaxial' },
        { name: '12V 2A Power Adapter', price: 350, label: '+ Adapter' },
        { name: '12V 10A Power Supply Box', price: 1200, label: '+ Power Box' },
        { name: 'BNC & DC Connector (Pair)', price: 60, label: '+ Connector' },
        { name: '19 Inch LED Monitor', price: 7500, label: '+ Monitor' },
        { name: 'HDMI Cable (5 Meter)', price: 300, label: '+ HDMI' },
        { name: 'CCTV Camera Box (PVC)', price: 120, label: '+ PVC Box' }
    ];

    return (
        <div className="preset-container flex gap-1.5 flex-wrap p-4 items-center">
            <span className="text-[11px] text-[#94a3b8]">কুইক আইটেম:</span>

            {/* Preset Chips Section */}
            {presets.map((p, idx) => (
                <span
                    key={idx}
                    onClick={() => addPreset(p.name, p.price)}
                    className="bg-[#2563eb]/15 border border-[#2563eb]/30 text-[#93c5fd] px-2.5 py-1 rounded-full text-[11px] cursor-pointer hover:bg-[#2563eb] hover:text-white transition"
                >
                    {p.label}
                </span>
            ))}
        </div>
    );
}
export default ItemPresets