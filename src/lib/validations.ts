import { z } from 'zod';

export const invoiceSchema = z.object({
    custName: z.string().min(1, { message: 'দয়া করে গ্রাহকের নাম লিখুন' }),
    custPhone: z.string().regex(/^01[3-9]\d{8}$/, {
        message: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)'
    }),
    custAddress: z.string().min(1, { message: 'দয়া করে গ্রাহকের ঠিকানা লিখুন' }),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;