import React from 'react';
import TableUserDevTool from './TableUserDynamic';
import Link from 'next/link';

function Section4Page() {
    return (
         <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', background: '#f5f7fa', padding: '20px' }}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Section 4: Analyzing Performance</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontWeight: 500, fontSize: 16 }}>
                        </span>
                    </div>
                </div>
                <div style={{ boxShadow: '0 2px 8px #00000012', borderRadius: 12, background: '#fff', padding: 32 }}>
                    <TableUserDevTool />
                </div>
            </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>   
                <Link href={'/performance-demo/section2'} style={{ marginTop: 24, fontWeight: 'bold', textDecoration: 'underline'}}>Back to Section 3</Link>
            </div>
        </div>
    );
}

export default Section4Page;