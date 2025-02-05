import { useState } from 'react';

const useTransmissionEditor = (nodes, setNodes, edges, setEdges) => {
    const [isTmsEditorOpen, setIsTmsEditorOpen] = useState(false);
    const [tmsEditorPosition, setTmsEditorPosition] = useState({ x: 0, y: 0 });

    // Source & Target
    const [selectedTmsSource, setSelectedTmsSource] = useState('');
    const [selectedTmsTarget, setSelectedTmsTarget] = useState('');

    // Actors & their params
    const [selectedTmsActors, setSelectedTmsActors] = useState([]);
    const [tmsActorParameters, setTmsActorParameters] = useState({});

    // NEW: Susceptibility & Infectivity params
    const [suscParams, setSuscParams] = useState([]);
    const [infParams, setInfParams] = useState([]);

    // We'll keep the ruleId portion for identifying the node
    const [tmsRuleId, setTmsRuleId] = useState(null);

    // ---------------------------
    //  Open the Transmission Editor
    // ---------------------------
    const openTmsEditor = (event, tmsNode) => {
        setTmsEditorPosition({ x: event.clientX, y: event.clientY });

        // Extract data from the node’s tmsRule, which must follow new schema
        const {
            source,
            target,
            ['actors-params']: actorsParams = {},
            susc_params = [],
            inf_params = []
        } = tmsNode.data.tmsRule || {};

        // If your node also stores a separate `actors` array, you can do:
        const actorIds = Object.keys(actorsParams);

        setSelectedTmsSource(source || '');
        setSelectedTmsTarget(target || '');
        setSelectedTmsActors(actorIds);
        setTmsActorParameters(actorsParams);

        setSuscParams(Array.isArray(susc_params) ? susc_params : []);
        setInfParams(Array.isArray(inf_params) ? inf_params : []);

        // Extract ID number: e.g. "tms_1" => 1
        // or keep the entire ID string if you prefer
        const ruleIdSplit = tmsNode.id.split('_');
        setTmsRuleId(ruleIdSplit[1]); // e.g. "1"

        setIsTmsEditorOpen(true);
    };

    // ---------------------------
    //  Close the Editor
    // ---------------------------
    const closeTmsEditor = () => {
        setIsTmsEditorOpen(false);

        // Reset
        setSelectedTmsSource('');
        setSelectedTmsTarget('');
        setSelectedTmsActors([]);
        setTmsActorParameters({});
        setSuscParams([]);
        setInfParams([]);
        setTmsRuleId(null);
    };

    // ---------------------------
    //  Manage Actors
    // ---------------------------
    const handleAddTmsActor = (actorId) => {
        if (actorId && !selectedTmsActors.includes(actorId)) {
            setSelectedTmsActors((prev) => [...prev, actorId]);
            setTmsActorParameters((prev) => ({ ...prev, [actorId]: '' }));
        }
    };

    const handleTmsParameterChange = (actorId, value) => {
        setTmsActorParameters((prev) => ({ ...prev, [actorId]: value }));
    };

    const handleRemoveTmsActor = (actorId) => {
        setSelectedTmsActors((prev) => prev.filter((id) => id !== actorId));
        setTmsActorParameters((prev) => {
            const { [actorId]: _, ...rest } = prev;
            return rest;
        });
    };

    // ---------------------------
    //  Manage Susceptibility Params
    // ---------------------------
    const addSuscParam = () => setSuscParams((prev) => [...prev, '']);

    const updateSuscParam = (index, newValue) => {
        setSuscParams((prev) => {
            const updated = [...prev];
            updated[index] = newValue;
            return updated;
        });
    };

    const removeSuscParam = (index) => {
        setSuscParams((prev) => prev.filter((_, i) => i !== index));
    };

    // ---------------------------
    //  Manage Infectivity Params
    // ---------------------------
    const addInfParam = () => setInfParams((prev) => [...prev, '']);

    const updateInfParam = (index, newValue) => {
        setInfParams((prev) => {
            const updated = [...prev];
            updated[index] = newValue;
            return updated;
        });
    };

    const removeInfParam = (index) => {
        setInfParams((prev) => prev.filter((_, i) => i !== index));
    };

    // ---------------------------
    //  Save Changes
    // ---------------------------
    const saveTmsChanges = () => {
        const sourceNode = nodes.find((n) => n.id === selectedTmsSource);
        const targetNode = nodes.find((n) => n.id === selectedTmsTarget);

        if (!sourceNode || !targetNode) {
            alert("Source or target node missing!");
            closeTmsEditor();
            return;
        }



        // Build the updated node data following the new schema

        const tmsNodeId = `tms_${tmsRuleId}`;
        const tmsNode = nodes.find(node => node.id === tmsNodeId);

        const newTmsRuleData = {
            source: selectedTmsSource,
            target: selectedTmsTarget,
            // "actors-params" is an object of {actorId: param}
            ["actors-params"]: tmsActorParameters,
            susc_params: suscParams,
            inf_params: infParams
        };

        // Create or update the "infection" node
        const infNode = {
            id: tmsNodeId,
            type: 'infection',
            position: tmsNode.position,
            data: {
                tmsRule: newTmsRuleData
            }
        };

        // Build the edges
        const tmsEdges = [
            {
                id: `tms_${tmsRuleId}_source_${sourceNode.id}`,
                source: sourceNode.id,
                target: tmsNodeId,
                type: 'tmsTrans',
                label: suscParams.filter(Boolean).join(" * "), // optional label
                markerEnd: "arrow"
            },
            {
                id: `tms_${tmsRuleId}_target_${targetNode.id}`,
                source: tmsNodeId,
                target: targetNode.id,
                type: 'tmsTrans',
                markerEnd: "arrow"
            }
        ];

        // Actor -> infNode edges
        const infEdges = selectedTmsActors.map((actor) => ({
            id: `tms_${tmsRuleId}_actor_${actor}`,
            source: actor,
            target: tmsNodeId,
            targetHandle: "infection",
            label: [
                ...infParams,
                tmsActorParameters[actor]
            ]
                .filter(Boolean)
                .join(" * "),
            type: 'infection',
            markerEnd: "arrow"
        }));

        // 1) Remove old edges that involve this tmsNode
        const updatedEdges = edges.filter(
            (edge) => edge.source !== tmsNodeId && edge.target !== tmsNodeId
        );

        // 2) Add the new edges
        const finalEdges = [...updatedEdges, ...tmsEdges, ...infEdges];

        setNodes(nds => nds.concat(infNode));

        // Update state
        setEdges(finalEdges);

        // Close editor
        closeTmsEditor();
    };

    // ---------------------------
    // Return all states & methods
    // ---------------------------
    return {
        isTmsEditorOpen,
        tmsEditorPosition,
        selectedTmsSource,
        setSelectedTmsSource,
        selectedTmsTarget,
        setSelectedTmsTarget,

        selectedTmsActors,
        handleAddTmsActor,
        handleTmsParameterChange,
        handleRemoveTmsActor,
        tmsActorParameters,

        suscParams,
        addSuscParam,
        updateSuscParam,
        removeSuscParam,

        infParams,
        addInfParam,
        updateInfParam,
        removeInfParam,

        openTmsEditor,
        closeTmsEditor,
        saveTmsChanges
    };
};

export default useTransmissionEditor;
