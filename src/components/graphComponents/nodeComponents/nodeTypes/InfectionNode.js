import React, {memo} from 'react';
import {Handle} from '@xyflow/react';

export default memo(({data, isConnectable}) => {
    return (
        <div
            style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >

            <Handle
                type="target"
                position="top"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <Handle
                id="infection"
                type="target"
                position="left"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="bottom"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <div>
                <strong>Infection</strong>
            </div>

        </div>
    );
});