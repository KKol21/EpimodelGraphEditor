import {useState} from 'react';

const useTransmissionPopover = (nodes, setNodes, edges, setEdges) => {
    const [isTmsPopoverOpen, setIsTmsPopoverOpen] = useState(false);
    const [tmsPopoverPosition, setTmsPopoverPosition] = useState({x: 0, y: 0});
    const [selectedTmsSource, setSelectedTmsSource] = useState('');
    const [selectedTmsTarget, setSelectedTmsTarget] = useState('');
    const [selectedTmsActors, setSelectedTmsActors] = useState([]);
    const [tmsActorParameters, setTmsActorParameters] = useState({});
    const [tmsRuleId, setTmsRuleId] = useState(null);

    const openTmsPopover = (event, tmsNode) => {
        setTmsPopoverPosition({x: event.clientX, y: event.clientY});
        const {source, target, actors, params} = tmsNode.data.tmsRule;
        setSelectedTmsSource(source);
        setSelectedTmsTarget(target);
        setSelectedTmsActors(actors);
        setTmsActorParameters(params);
        setTmsRuleId(tmsNode.id.split('_')[1]);
        setIsTmsPopoverOpen(true);
    };

    const closeTmsPopover = () => {
        setIsTmsPopoverOpen(false);
        setSelectedTmsSource('');
        setSelectedTmsTarget('');
        setSelectedTmsActors([]);
        setTmsActorParameters({});
        setTmsRuleId(null);
    };

    const handleAddTmsActor = (actorId) => {
        if (actorId && !selectedTmsActors.includes(actorId)) {
            setSelectedTmsActors([...selectedTmsActors, actorId]);
            setTmsActorParameters({...tmsActorParameters, [actorId]: ''});
        }
    };

    const handleTmsParameterChange = (actorId, value) => {
        setTmsActorParameters({...tmsActorParameters, [actorId]: value});
    };

    const handleRemoveTmsActor = (actorId) => {
        setSelectedTmsActors(selectedTmsActors.filter(id => id !== actorId));
        const {[actorId]: _, ...newActorParameters} = tmsActorParameters;
        setTmsActorParameters(newActorParameters);
    };

    const saveTmsChanges = () => {
        const sourceNode = nodes.find(node => node.id === selectedTmsSource);
        const targetNode = nodes.find(node => node.id === selectedTmsTarget);

        if (!sourceNode || !targetNode) {
            alert("Source or target node missing!");
            closeTmsPopover();
            return;
        }

        const x = (sourceNode.position.x + targetNode.position.x) / 2 - 10;
        const y = (sourceNode.position.y + targetNode.position.y) / 2 - 10;

        const infNode = {
            id: `tms_${tmsRuleId}`,
            type: 'infection',
            position: {x, y},
            data: {
                transmissionRule: {
                    source: selectedTmsSource,
                    target: selectedTmsTarget,
                    actors: selectedTmsActors,
                    params: selectedTmsActors.map(actor => ({actor: tmsActorParameters[actor]}))
                }
            }
        };

        const tmsEdges = [
            {
                id: `tms_${tmsRuleId}_source_${sourceNode.id}`,
                source: sourceNode.id,
                target: infNode.id,
                type: 'tmsTrans',
                markerEnd: "arrow"
            },
            {
                id: `tms_${tmsRuleId}_target_${targetNode.id}`,
                source: infNode.id,
                target: targetNode.id,
                type: 'tmsTrans',
                markerEnd: "arrow"
            }
        ];

        const infEdges = selectedTmsActors.map(actor =>
            (
                {
                    id: `tms_${tmsRuleId}_actor_${actor}`,
                    source: actor,
                    target: infNode.id,
                    targetHandle: "infection",
                    label: tmsActorParameters[actor] || "",
                    type: 'infection',
                    markerEnd: "arrow"
                }
            )
        );

        setEdges(edges.filter(
                edge => edge.source !== infNode.id && edge.target !== infNode.id
            ).concat(...infEdges, ...tmsEdges)
        )

        const tmsRule = {
            source: selectedTmsSource,
            target: selectedTmsTarget,
            actors: selectedTmsActors,
            params: Object.assign({},
                ...selectedTmsActors.map(actor => ({[actor]: tmsActorParameters[actor]}))),
        }
        console.log(tmsRule.params);
        setNodes(nodes.map(
            node => (node.id === `tms_${tmsRuleId}` ?
                    {...node, data: {tmsRule: tmsRule}} :
                    node
            )));
        closeTmsPopover();
    };

    return {
        isTmsPopoverOpen,
        tmsPopoverPosition,
        selectedTmsSource,
        setSelectedTmsSource,
        selectedTmsTarget,
        setSelectedTmsTarget,
        selectedTmsActors,
        handleAddTmsActor,
        handleTmsParameterChange,
        handleRemoveTmsActor,
        tmsActorParameters,
        openTmsPopover,
        closeTmsPopover,
        saveTmsChanges
    };
};

export default useTransmissionPopover;
