import { Handle, Position, useReactFlow } from "@xyflow/react";
import React, { useState, useCallback, useEffect, useRef } from "react";
import "@xyflow/react/dist/style.css";

function LRHandleNode({ id, data, selected }) {
    //console.log(data);
    const { setNodes } = useReactFlow();
    const [isEditing, setIsEditing] = useState(false);
    const [nodeLabel, setNodeLabel] = useState(data.label || "");
    const inputRef = useRef(null);

    //ノードのラベルが外部から変更された場合
    useEffect(() => {
        setNodeLabel(data.label || "");
    }, [data.label]);

    //編集モードになったら、自動でinpputにフォーカスを当てる
    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    //編集を終了し、ノードのデータを更新する
    const finishEditing = useCallback(() => {
        setIsEditing(false);

        // setNodesを使ってノードのデータを更新
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: { ...node.data, label: nodeLabel },
                    };
                }
                return node;
            })
        );
    }, [id, nodeLabel, setNodes]);

    //Enterキーで編集を終了する
    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === "Enter") {
                finishEditing();
            }
        },
        [finishEditing]
    );

    return (
        // ダブルクリックで編集モードに切り替え
        <div
            className={`react-flow__node-default ${selected ? "selected" : ""}`}
            onDoubleClick={() => setIsEditing(true)}
            onMouseDown={(e) => e.stopPropagation()} // クリックイベントの伝播を防ぐ
            onMouseUp={(e) => e.stopPropagation()} // クリックイベントの伝播を防ぐ
            style={{
                padding: "10px 15px",
                width: `${Math.max(200, nodeLabel.length * 8)}px`,
            }}
        >
            <Handle type="target" position={Position.Left} />

            {isEditing ? (
                <input
                    ref={inputRef}
                    value={nodeLabel}
                    onChange={(e) => setNodeLabel(e.target.value)}
                    onBlur={finishEditing}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: `${Math.max(100, nodeLabel.length * 15)}px`,
                    }}
                />
            ) : (
                <div
                    style={{
                        textAlighn: "center",
                        cursor: "pointer",
                    }}
                >
                    {nodeLabel || "Double-click to edit"}
                </div>
            )}
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
export default LRHandleNode;
