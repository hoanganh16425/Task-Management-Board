'use client'
import React, { useState } from 'react';

import { Switch } from 'antd';
import TableUserFilterOptimized from './_component-demo/TableUserFilterOptimized';
import TableUserFilter from './_component-demo/TableUserFilter';
import Link from 'next/link';



function Section2Page() {
    const [section2, setSection2] = useState<boolean>(false);
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', background: '#f5f7fa', padding: '20px' }}>
            <div style={{ width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Section 2: Optimize with useCallback and useMemo</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Switch checked={section2} onChange={() => setSection2(!section2)} />
                        <span style={{ fontWeight: 500, fontSize: 16 }}>
                            {section2 ? 'Optimized Mode (Using useCallback & useMemo)' : 'Before Optimization Mode'}
                        </span>
                    </div>
                </div>
                <div style={{ boxShadow: '0 2px 8px #00000012', borderRadius: 12, background: '#fff', padding: 32 }}>
                    {section2 ? <TableUserFilterOptimized /> : <TableUserFilter />}
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Link href={'/performance-demo/section1'} style={{ marginTop: 24, fontWeight: 'bold', textDecoration: 'underline'}}>Back to Section 1</Link>
                <Link href={'/performance-demo/section3'} style={{ marginTop: 24, fontWeight: 'bold', textDecoration: 'underline' }}>Go to Section 3</Link>
            </div>
        </div>
    );
}

export default Section2Page;