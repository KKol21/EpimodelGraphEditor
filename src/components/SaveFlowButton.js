import React, { useState, useRef, useEffect } from 'react';
import formatFlow from "./FlowFormatter";
import Snackbar from './snackbar/Snackbar';

const SaveFlowButton = ({ nodes, edges }) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setMenuVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // Helper to trigger a JSON file download
    const downloadJsonFile = (jsonString, filename) => {
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        URL.revokeObjectURL(url);
    };

    const handleOptionClick = (option) => {
        if (option === 'rawClipboard') {
            const flowJSON = JSON.stringify({ nodes, edges }, null, 2);
            navigator.clipboard.writeText(flowJSON).then(() => {
                setSnackbarMessage('Raw flow copied to clipboard');
                setSnackbarVisible(true);
            });
        } else if (option === 'rawJson') {
            const flowJSON = JSON.stringify({ nodes, edges }, null, 2);
            downloadJsonFile(flowJSON, 'flow-raw.json');
            setSnackbarMessage('Raw flow downloaded as JSON file');
            setSnackbarVisible(true);
        } else if (option === 'formattedClipboard') {
            // Pass nodes and edges separately.
            const formattedFlow = formatFlow(nodes, edges);
            const formattedFlowJSON = JSON.stringify(formattedFlow, null, 2);
            navigator.clipboard.writeText(formattedFlowJSON).then(() => {
                setSnackbarMessage('Formatted flow copied to clipboard');
                setSnackbarVisible(true);
            });
        } else if (option === 'formattedJson') {
            const formattedFlow = formatFlow(nodes, edges);
            const formattedFlowJSON = JSON.stringify(formattedFlow, null, 2);
            downloadJsonFile(formattedFlowJSON, 'flow-formatted.json');
            setSnackbarMessage('Formatted flow downloaded as JSON file');
            setSnackbarVisible(true);
        }
        setMenuVisible(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button ref={buttonRef} onClick={() => setMenuVisible((v) => !v)}>
                Save Flow
            </button>

            {menuVisible && (
                <div
                    ref={menuRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: 'white',
                        border: '1px solid #ccc',
                        zIndex: 1000,
                        padding: '8px',
                        width: '200px'
                    }}
                >
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Raw</div>
                    <button
                        style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '4px' }}
                        onClick={() => handleOptionClick('rawClipboard')}
                    >
                        Save to Clipboard
                    </button>
                    <button
                        style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '8px' }}
                        onClick={() => handleOptionClick('rawJson')}
                    >
                        Download as JSON
                    </button>
                    <hr style={{ margin: '8px 0' }} />
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Formatted</div>
                    <button
                        style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '4px' }}
                        onClick={() => handleOptionClick('formattedClipboard')}
                    >
                        Save to Clipboard
                    </button>
                    <button
                        style={{ display: 'block', width: '100%', textAlign: 'left' }}
                        onClick={() => handleOptionClick('formattedJson')}
                    >
                        Download as JSON
                    </button>
                </div>
            )}

            <Snackbar
                message={snackbarMessage}
                visible={snackbarVisible}
                setVisible={setSnackbarVisible}
            />
        </div>
    );
};

export default SaveFlowButton;
