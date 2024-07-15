const processGraphData = (data) => {
    const nodes = Object.keys(data.state_data).map((key) => ({
        id: key,
        type: 'state',
        data: { label: key,
                type: data.state_data[key].type ?? "",
                n_substates: data.state_data[key].n_substates ?? 1,
                color: 'green',
        },
        position: { x: 400 + 100 * Math.random(), y: 300 + 200 * Math.random()},
    }));

    const transEdges = data.trans_data.map((trans) => ({
        id: `${trans.source}-${trans.target}`,
        source: trans.source,
        target: trans.target,
        type: 'transition',
        data: {param: trans.param },
        markerEnd: "arrow"
    }));

    const tmsEdges = data.tms_rules.map((tms, index) => ({
        id: `tms-${index}`,
        source: tms.source,
        target: tms.target,
        data: {type: 'tms', 'actors-params': tms['actors-params']},
        animated: true,
    }));

    return { nodes, edges: [...transEdges, ...tmsEdges] };
};

export default processGraphData;
