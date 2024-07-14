import React from 'react';
import GraphEditor from './components/graphComponents/GraphEditor';
import processGraphData from "./utils/processGraphData";
import seirData from './data/SEIRStruct.json'


const { nodes, edges } = processGraphData(seirData);


function App() {
    return (
        <div className="App">
            <h1>Epidemic Transmission Graph Editor</h1>
            <GraphEditor initialNodes={nodes} initialEdges={edges}/>
        </div>
    );
}

export default App;
