import React from 'react';
import ClientHeader from '../component/layouts/Header';
import ClientSidebar from '../component/layouts/Sidebar';
import LayoutShell from '../component/layouts/LayoutShell';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <LayoutShell
            sidebar={<ClientSidebar />}
            header={<ClientHeader />}
        >
                {children}
        </LayoutShell>
    );
}