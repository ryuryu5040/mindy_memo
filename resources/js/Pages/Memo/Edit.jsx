import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useCallback, useRef } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LRHandleNode from "@/Components/LRHandleNode";
const initialNodes = [
    { id: '1', type: 'LRHandle', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', type: 'LRHandle', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const panOnDrag = [1, 2];
const nodeTypes = { LRHandle: LRHandleNode };
let id = 3;
const getId = () => `${id++}`;
const FlowComponent = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const connectingNodeId = useRef(null);
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);
    const onConnectEnd = useCallback(
        (event) => {
            const targetIsPane = event.target.classList.contains('react-flow__pane');
            if (targetIsPane && connectingNodeId.current) {
                const sourceNodeId = connectingNodeId.current;
                const newNodeId = getId();
                const newNode = {
                    id: newNodeId,
                    type: 'LRHandle',
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    data: { label: `Node ${newNodeId}` },
                    origin: [0.5, 0.5],
                };
                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({ id: `e${sourceNodeId}-${newNodeId}`, source: sourceNodeId, target: newNodeId }),
                );
            }
            connectingNodeId.current = null;
        },
        [screenToFlowPosition]
    );
    return (
        <div style={{ width: '100vw', height: '80vh', overflow: 'visible' }}>
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
                    nodeColor={() => '#00BCD4'}
                    style={{
                        backgroundColor: '#F0F0F0',
                        border: '1px solid #ccc',
                        zIndex: 100
                    }}
                />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};
// ページコンポーネント
const Edit = (props) => {
    return (
        <Authenticated user={props.auth.user} header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Show
            </h2>
        }>
            <ReactFlowProvider>
                <FlowComponent />
            </ReactFlowProvider>
        </Authenticated>
    );
}
export default Edit;