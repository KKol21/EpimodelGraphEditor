import React, { memo } from 'react';
import { Handle } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
    return (
        <div
            style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: data.color || '#4ade80',  // soft green
                border: "2px solid #10b981",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "#fff"
            }}
        >
        <Handle
                type="target"
                position="left"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
            <div>
                {data.label}
            </div>
        </div>
    );
});
