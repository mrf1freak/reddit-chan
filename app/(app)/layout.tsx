import { Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "./components/AppHeader";
import { AppSidebar } from "./components/AppSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Suspense>
        <AppSidebar variant="inset" />
      </Suspense>
      <SidebarInset>
        <AppHeader />
        <div className="@container/main flex flex-1 flex-col gap-2">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
