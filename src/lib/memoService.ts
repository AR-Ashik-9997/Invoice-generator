/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export const fetchMemosFromSupabase = async (setSavedMemos: (data: any[]) => void) => {
    const { data, error } = await supabase.from('memos').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching memos:', error.message);
    } else if (data) {
        setSavedMemos(data);
    }
};

export const deleteMemoFromSupabase = async (
    id: string,
    filePath: string,
    onSuccess: () => void
) => {
    try {
        if (filePath) {
            const { error: storageError } = await supabase.storage
                .from('invoices')
                .remove([filePath]);

            if (storageError) {
                toast.error(`Storage Delete Error: ${storageError.message}`);
            }
        }
        const { error: dbError } = await supabase
            .from('memos')
            .delete()
            .eq('id', id);

        if (dbError) {
            throw new Error(dbError.message);
        }
        onSuccess();

    } catch (error: any) {
        throw new Error(error.message || 'ডিলিট করতে সমস্যা হয়েছে।');
    }
};