# Invoice Generator

Invoice Generator is a modern invoice and billing application designed for service-based businesses, with a strong focus on CCTV, surveillance, and installation operations. It helps teams create professional invoices, calculate totals automatically, save draft records, generate PDF files, and share them instantly with clients.

The platform is built with Next.js, TypeScript, Tailwind CSS, React, and Supabase, delivering a fast, polished, and production-ready invoicing workflow for business owners and support teams.

## Features

- Create branded customer invoices with business details and company information
- Add, edit, and delete invoice line items with pricing and quantity controls
- Use built-in presets for common CCTV and installation products
- Auto-calculate subtotal, service charges, discounts, and grand totals
- Generate a print-ready PDF invoice using React PDF
- Save invoices to a secure Supabase backend
- Load, review, and delete previously saved invoices from the sidebar
- Share invoices with clients through WhatsApp or email
- Responsive desktop-first interface suitable for business operations

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- @react-pdf/renderer
- Sonner for notifications

## Project Structure

```text
invoice-generator/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── shared/
│   │   │   └── generate_pdf.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── InvoiceDetails/
│   │   ├── ItemTable/
│   │   ├── ItemPresets/
│   │   ├── TotalsSummary/
│   │   └── Footer/
│   ├── hooks/
│   │   └── useInvoiceManager.ts
│   ├── lib/
│   │   ├── memoUtils.ts
│   │   ├── memoService.ts
│   │   ├── supabaseClient.ts
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   ├── validations.ts
│   │   └── ...
│   └── globals.css
├── public/
├── .env.local
├── .gitignore
├── components.json
├── package.json
├── README.md
├── yarn.lock
└── next.config.ts
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js 18+ or 20+
- Yarn 4+
- A Supabase project with storage and database enabled

## Environment Setup

Create a `.env.local` file in the project root and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

You should also ensure your Supabase project contains the required `memos` table and invoice storage bucket for uploads and retrieval.

## Installation

```bash
yarn install
```

## Running the App

Start the development server:

```bash
yarn dev
```

Open the application in your browser at:

```text
http://localhost:3000
```

## Production Build

```bash
yarn build
```

Then start the production server:

```bash
yarn start
```

## Usage Workflow

1. Open the invoice generator and fill in company and customer details.
2. Add products or services to the invoice table.
3. Adjust charges, discounts, and totals as needed.
4. Save the invoice to the connected database.
5. Generate PDF output or share it through WhatsApp/email.
6. View previous saved invoices from the sidebar and restore them when needed.

## Business Use Case

This application is especially well suited for commercial service providers such as:

- CCTV installation companies
- Security system vendors
- Electrical or maintenance service businesses
- General service invoicing and billing teams

## License

This project is currently for internal or commercial use and is intended for business operational workflows.

## Notes

The application currently includes a preconfigured CCTV/business invoice theme and sample invoice data, which can be customized to match your own brand, pricing structure, and operational requirements.
