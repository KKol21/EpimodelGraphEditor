export const formatFlow = (nodes, edges) => {
    const state_data = {};
    const trans_data = [];
    const tms_rules = [];
    console.log(nodes);

    // Collect state data from nodes of type "state"
    const states = nodes.filter(node => node.type === "state");
    states.forEach(node => {
        state_data[node.id] = {type: node.data.type,
        rate: node.data.rate};
    });

    // Collect transition data from edges of type "transition"
    const transitions = edges.filter(edge => edge.type === "transition");
    transitions.forEach(edge => {
        trans_data.push({
            source: edge.source,
            target: edge.target,
            params: edge.data.params,
        });
    });

    // Collect tms rules from nodes of type "infection"
    const transmissions = nodes
        .filter(node => node.type === "infection")
        .map(node => node.data.tmsRule);
    transmissions.forEach(rule => {
        tms_rules.push({
            ...rule,
            susc: rule.susc_params,
            inf: rule.inf_params,
        });
    });

    return {state_data, trans_data, tms_rules}
};


export default formatFlow;