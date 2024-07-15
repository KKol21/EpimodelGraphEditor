import React, {memo} from 'react';
import {Handle} from '@xyflow/react';

export default memo(({data, isConnectable}) => {
    console.log(data);
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
            }}
        >
            <Handle
                type="source"
                position="left"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <div>
                {data.label}
            </div>

            <Handle
                type="target"
                position="right"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
        </div>
    );
});