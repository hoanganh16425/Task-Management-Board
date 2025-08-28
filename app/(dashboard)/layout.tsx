'use client'
import React from 'react';
import ClientHeader from '../component/layouts/Header';
import ClientSidebar from '../component/layouts/Sidebar';
import LoadingSpinner from '../loading';
import dynamic from 'next/dynamic';
const LayoutShell = dynamic(() => import('../component/layouts/LayoutShell'), {
    ssr: false,
    loading: () => <LoadingSpinner />
});

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