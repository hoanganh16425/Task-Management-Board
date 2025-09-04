import React from 'react';

const PerformanceTestGuide: React.FC = () => {
  return (
    <>
        <div style={{ background: '#f6f8fa', borderRadius: 6, padding: 12, fontSize: 14, textAlign: 'left' }}>
          <b>Performance Testing Guide:</b>
          <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
            <li>Open <b>React DevTools</b> and use the <b>Profiler</b> tab to see render counts.</li>
            <li>Open <b>Chrome DevTools</b> &gt; <b>Lighthouse</b> and run an audit to compare before vs after optimization.</li>
          </ul>
        </div>
  
    </>
  );
};

export default PerformanceTestGuide;
