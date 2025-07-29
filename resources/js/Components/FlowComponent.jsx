import React, { useCallback, useRef, useEffect } from "react";
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    SelectionMode,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
    useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import LRHandleNode from "@/Components/LRHandleNode";

const panOnDrag = [1, 2];
const nodeTypes = { LRHandle: LRHandleNode };
const getId = () => crypto.randomUUID();

export default function FlowComponent({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setNodes,
    setEdges,
}) {
    const { screenToFlowPosition } = useReactFlow();
    const connectingNodeId = useRef(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );
    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);
    const onConnectEnd = useCallback(
        (event, connectionState) => {
            const targetIsPane =
                event.target.classList.contains("react-flow__pane");
            if (
                targetIsPane &&
                connectingNodeId.current &&
                !connectionState.isValid
            ) {
                const sourceNodeId = connectingNodeId.current;
                /*
                const allNodeIds = nodes.map((node) => parseInt(node.id, 10));
                const maxNodeId = Math.max(0, ...allNodeIds);
                const newNodeIdnum = maxNodeId + 1;
                const newNodeId = String(newNodeIdnum);
                */
                const newNodeId = getId();

                const newNode = {
                    id: newNodeId,
                    type: "LRHandle",
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    data: { label: `Node` },
                    origin: [0.5, 0.5],
                };
                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({
                        id: `e${sourceNodeId}-${newNodeId}`,
                        source: sourceNodeId,
                        target: newNodeId,
                    })
                );
            }
            connectingNodeId.current = null;
        },
        [screenToFlowPosition, nodes, setNodes, setEdges]
    );
    return (
        <div style={{ width: "100vw", height: "80vh", overflow: "visible" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                panOnScroll
                selectionOnDrag
                panOnDrag={panOnDrag}
                selectionMode={SelectionMode.Partial}
                fitView
            >
                <Controls />
                <MiniMap
                    className="custom-minimap"
                    nodeColor={() => "#00BCD4"}
                    style={{
                        backgroundColor: "#f0f0f00",
                        border: "1px solid #ccc",
                        zIndex: 100,
                    }}
                />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
