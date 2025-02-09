import React, { memo } from 'react';
import { Handle } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
    return (
        <div
            style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: data.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
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
