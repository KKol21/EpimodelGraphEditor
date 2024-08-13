import React, {useState} from 'react';
import Snackbar from './snackbar/Snackbar';  // Import the Snackbar component

const SaveFlowButton = ({nodes, edges}) => {
    const [visible, setVisible] = useState(false);

    const handleSave = () => {
        const flow = {nodes, edges};
        const flowJSON = JSON.stringify(flow, null, 2);
        navigator.clipboard.writeText(flowJSON).then(() => {
            setVisible(true);
        });
    };

    return (
        <>
            <button onClick={handleSave}>Save Flow</button>
            <Snackbar message="Flow copied to clipboard"
                      visible={visible}
                      setVisible={setVisible}
            />
        </>
    );
};

export default SaveFlowButton;
