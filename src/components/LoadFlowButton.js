import React, { useState, useRef, useEffect } from 'react';
import Snackbar from './snackbar/Snackbar';

const LoadFlowButton = ({ setNodes, setEdges }) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const fileInputRef = useRef(null);

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

    // Load from clipboard
    const loadFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            const data = JSON.parse(text);

            if (data.nodes && data.edges) {
                setNodes(data.nodes);
                setEdges(data.edges);
                setSnackbarMessage('Flow loaded from clipboard!');
                setSnackbarVisible(true);
            } else {
                throw new Error('Invalid clipboard data format');
            }
        } catch (error) {
            setSnackbarMessage('Failed to load from clipboard. Ensure the data is valid JSON.');
            setSnackbarVisible(true);
            console.error(error);
        }
        setMenuVisible(false);
    };

    // Load from a JSON file
    const loadFromFile = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                console.log(data);
                if (data.nodes && data.edges) {
                    setNodes(data.nodes);
                    setEdges(data.edges);
                    setSnackbarMessage('Flow loaded from file!');
                    setSnackbarVisible(true);
                } else {
                    throw new Error('Invalid JSON structure');
                }
            } catch (error) {
                setSnackbarMessage('Failed to load from file. Ensure the JSON format is correct.');
                setSnackbarVisible(true);
                console.error(error);
            }
        };
        reader.readAsText(file);
    };

    // Handle dropdown option click
    const handleOptionClick = (option) => {
        if (option === 'clipboard') {
            loadFromClipboard();
        } else if (option === 'json') {
            fileInputRef.current.click(); // Opens file selector
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button ref={buttonRef} onClick={() => setMenuVisible((v) => !v)}>
                Load Flow
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
                        width: '160px',
                    }}
                >
                    <button
                        style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '4px' }}
                        onClick={() => handleOptionClick('clipboard')}
                    >
                        Load from Clipboard
                    </button>
                    <button
                        style={{ display: 'block', width: '100%', textAlign: 'left' }}
                        onClick={() => handleOptionClick('json')}
                    >
                        Load from JSON
                    </button>
                </div>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={loadFromFile}
                style={{ display: 'none' }}
            />

            {/* Snackbar for feedback messages */}
            <Snackbar
                message={snackbarMessage}
                visible={snackbarVisible}
                setVisible={setSnackbarVisible}
            />
        </div>
    );
};

export default LoadFlowButton;
