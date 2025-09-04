'use client'
import React, { useState } from 'react';
import { Switch } from 'antd';
import Link from 'next/link';
import TableUserDynamic from './_component-demo/TableUserDynamic';
import TableUserDirect from './_component-demo/TableUserDirect';


function Section3Page() {
    const [section3, setSection3] = useState<boolean>(false);
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', background: '#f5f7fa', padding: '20px' }}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Section 3: Code Splitting + Lazy Loading</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Switch checked={section3} onChange={() => setSection3(!section3)} />
                        <span style={{ fontWeight: 500, fontSize: 16 }}>
                            {section3 ? 'Dynamic Import Mode' : 'Direct Import Mode'}
                        </span>
                    </div>
                </div>
                <div style={{ boxShadow: '0 2px 8px #00000012', borderRadius: 12, background: '#fff', padding: 32 }}>
                    {section3 ? <TableUserDynamic /> : <TableUserDirect />}
                </div>
            </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>   
                <Link href={'/performance-demo/section2'} style={{ marginTop: 24, fontWeight: 'bold', textDecoration: 'underline'}}>Back to Section 2</Link>
                <Link href={'/performance-demo/section4'} style={{ marginTop: 24, fontWeight: 'bold', textDecoration: 'underline' }}>Go to Section 4</Link>
            </div>
        </div>
    );
}

export default Section3Page;