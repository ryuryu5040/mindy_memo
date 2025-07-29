import FlowComponent from "@/Components/FlowComponent";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
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

const getId = () => crypto.randomUUID();

// ページコンポーネント
const Edit = (props) => {
    const { memo } = props;
    console.log(memo, props);
    //const { screenToFlowPosition } = useReactFlow();
    const initialNodes = props.nodes.map((node) => ({
        id: String(node.id),
        type: node.type,
        position: { x: node.position_x, y: node.position_y },
        data: { label: node.prime_text },
    }));

    const initialEdges = props.edges.map((edge) => ({
        id: `e${edge.start_node}-${edge.end_node}`,
        source: String(edge.start_node),
        target: String(edge.end_node),
    }));

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [memo, setNodes, setEdges]);

    const handleSave = () => {
        router.put(route("memos.update", memo.id), {
            nodes: nodes,
            edges: edges,
        });
    };

    const handleAddNode = () => {
        const newNodeId = getId();

        const newNode = {
            id: newNodeId,
            type: "LRHandle",
            position: {
                x: 0,
                y: 0,
            },
            data: { label: `Node` },
            origin: [0.5, 0.5],
        };
        setNodes((nds) => nds.concat(newNode));
    };

    return (
        <Authenticated
            user={props.auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {memo.title}
                    </h2>
                    <button
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                        onClick={handleAddNode}
                    >
                        new node
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                        onClick={handleSave}
                    >
                        SAVE
                    </button>
                </div>
            }
        >
            <ReactFlowProvider>
                <FlowComponent
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    setNodes={setNodes}
                    setEdges={setEdges}
                />
            </ReactFlowProvider>
        </Authenticated>
    );
};
export default Edit;
