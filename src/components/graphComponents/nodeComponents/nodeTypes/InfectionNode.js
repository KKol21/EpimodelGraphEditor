import React, {memo} from 'react';
import {Handle} from '@xyflow/react';

export default memo(({data, isConnectable}) => {
    return (
        <div
            style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "#f87171",  // soft red
                border: "2px solid #ef4444",
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
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <Handle
                id="infection"
                type="target"
                position="top"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <div>
                <strong>Infection</strong>
            </div>

        </div>
    );
});