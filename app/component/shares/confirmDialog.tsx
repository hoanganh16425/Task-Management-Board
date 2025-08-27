
import { Modal } from 'antd'
import { LegacyButtonType } from 'antd/es/button/button';
import React from 'react'

interface ConfirmDialogProps {
    isModalOpen: boolean;
    title: string;
    confirmText: string;
    okText: string;
    okType: LegacyButtonType;
    onConfirm: () => void;
    onClose: () => void;
}

function ConfirmDialog({ title, okText, okType, confirmText, isModalOpen, onConfirm, onClose }: ConfirmDialogProps) {
    return (
        <Modal
            title={title}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            okText={okText}
            okType={okType}
            onOk={() => onConfirm()}
            onCancel={() => onClose()}
        >
            { confirmText }
        </Modal>
    )
}

export default ConfirmDialog