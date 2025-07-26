// App.jsx
import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// 初期ノードとエッジの定義
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "スタート" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "処理" },
    position: { x: 250, y: 100 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "完了" },
    position: { x: 250, y: 200 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

function FlowChart() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  // 接続処理
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowChart;