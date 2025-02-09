import React from 'react';
import { BaseEdge } from '@xyflow/react';

export default function InfectionEdge({ id, label, markerEnd, ...props }) {
    // Extract the source and target coordinates.
    const { sourceX, sourceY, targetX, targetY } = props;

    // Use the node's height if provided; otherwise, default to 100.
    // (Adjust this value or pass a nodeHeight prop if available.)
    const nodeHeight = 80;

    // Compute the top and bottom edges of the infectious state node.
    // (Assuming sourceX, sourceY are at the center of the node.)
    const nodeTop = sourceY - nodeHeight / 2;
    const nodeBottom = sourceY + nodeHeight / 2;

    // Decide whether to use the top or bottom connection point.
    // Rule: "from the Top if the bottom of the node is not higher by 100 px than the target."
    // Since y increases downward in the browser, being “higher” means a smaller y value.
    // Here we check: if the gap (targetY - nodeBottom) is less than 100, then the node’s bottom
    // isn’t far enough above the target, so we use the top connection.
    const useTop = (nodeBottom - targetY < 100);
    const connectionY = useTop ? nodeTop : nodeBottom;

    // Define a vertical offset (50 px) to move away from the node.
    // If we’re using the top, we subtract (go upward); if bottom, we add (go downward).
    const offsetY = 50;
    const intermediateY = connectionY + (useTop ? -offsetY : offsetY);

    // Construct the rectangular (L-shaped) edge path:
    // 1. Move from the connection point on the node.
    // 2. Draw a vertical line to the intermediate offset.
    // 3. Draw a horizontal line to the target's x coordinate.
    // 4. Draw a vertical line to the target.
    const sourceMidX = sourceX - nodeHeight / 2;
    const edgePath = `M${sourceMidX},${connectionY} L${sourceMidX},${intermediateY} L${targetX},${intermediateY} L${targetX},${targetY}`;

    // Position the label at the middle of the horizontal segment.
    const labelX = (sourceMidX + targetX) / 2;

    return (
        <BaseEdge
            id={id}
            path={edgePath}
            //markerEnd={markerEnd}
            label={label}
            labelX={labelX}
            labelY={intermediateY}
            style={{ strokeDasharray: '5 5' }}
        />
    );
}
