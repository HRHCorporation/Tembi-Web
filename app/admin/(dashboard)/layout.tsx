// import "@/css/satoshi.css";
// import "@/css/style.css";

// import "flatpickr/dist/flatpickr.min.css";
// import "jsvectormap/dist/jsvectormap.css";

// import { Header } from "@/components/admin/layouts/header";
// import { Sidebar } from "@/components/admin/layouts/sidebar";
// import { Providers } from "@/app/providers";

// import type { PropsWithChildren } from "react";
// import NextTopLoader from "nextjs-toploader";
// import { Toaster } from "sonner";

// export default function AdminLayout({
//   children,
// }: PropsWithChildren) {
//   return (
//     <Providers>
//       <NextTopLoader color="#5750F1" showSpinner={false} />

//       <div className="flex min-h-screen">
//         <Sidebar />

//         <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
//           <Header />

//           <main className="isolate mx-auto w-full max-w-(--breakpoint-2xl) overflow-hidden p-4 md:p-6 2xl:p-10">
//             {children}
//           </main>
//         </div>
//       </div>

//       <Toaster
//         position="bottom-right"
//         richColors
//         closeButton
//         duration={5000}
//       />
//     </Providers>
//   );
// }

import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { Providers } from "@/app/providers";
import { Sidebar } from "@/components/admin/layouts/sidebar";
import { Header } from "@/components/admin/layouts/header";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />

              <main className="isolate mx-auto w-full max-w-(--breakpoint-2xl) overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>

          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={5000}
            toastOptions={{
              className: "dark:bg-gray-dark dark:border-dark-3 dark:text-white",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}


