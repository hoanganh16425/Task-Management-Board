import React, { useState } from 'react';
import { FloatButton, Tooltip, Modal } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';

const PerformanceTestGuide: React.FC = () => {
  const [open, setOpen] = useState(false);



  return (
    <>
      <Tooltip title="Run Performance Test" placement="left">
        <FloatButton
          icon={<ThunderboltOutlined />}
          type="primary"
          style={{ right: 24, bottom: 24, zIndex: 9999 }}
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      <Modal
        title="Performance Testing Guide"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        centered
      >

        <div style={{ background: '#f6f8fa', borderRadius: 6, padding: 12, fontSize: 14, textAlign: 'left' }}>
          <b>Performance Testing Guide:</b>
          <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
            <li>Open <b>React DevTools</b> and use the <b>Profiler</b> tab to see render counts.</li>
            <li>Open <b>Chrome DevTools</b> &gt; <b>Lighthouse</b> and run an audit to compare before vs after optimization.</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default PerformanceTestGuide;
