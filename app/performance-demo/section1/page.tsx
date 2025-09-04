'use client'
import React, { useState } from 'react';
import { Switch } from 'antd';
import TableUserOptimized from './_component-demo/TableUserOptimized';
import TableUser from './_component-demo/TableUser';
import Link from 'next/link';


function Section1Page() {
    const [section1, setSection1] = useState<boolean>(false);
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', background: '#f5f7fa', padding: '20px' }}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Section 1: Avoid Unnecessary Re-render</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Switch checked={section1} onChange={() => setSection1(!section1)} />
                        <span style={{ fontWeight: 500, fontSize: 16 }}>
                            {section1 ? 'Optimized Mode (Using React.Memo)' : 'Before Optimization Mode'}
                        </span>
                    </div>
                </div>
                <div style={{ boxShadow: '0 2px 8px #00000012', borderRadius: 12, background: '#fff', padding: 32 }}>
                    {section1 ? <TableUserOptimized /> : <TableUser />}
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>

                <Link href={'/performance-demo/section2'} style={{ marginTop: 24, fontWeight: 'bold', textDecoration: 'underline', textAlign: 'right' }}>Go to Section 2</Link>
            </div>
        </div>
    );
}

export default Section1Page;