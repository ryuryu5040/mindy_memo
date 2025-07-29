<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Memo;
use App\Models\Node;
use App\Models\Edge;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Throwable;

class MemoController extends Controller
{
    //
    public function top(Memo $memo)
    {
        $user_memo = Auth::user()->memos;
        //dd($user_memo);
        return Inertia::render("Memo/Top",["memos" => $user_memo]);
    }

    public function edit(Memo $memo)
    {
        $memo_id = $memo->id;
        $memos = Memo::with(['edge', 'node'])->find($memo_id);
        $nodes = $memos -> node;
        $edges = $memos -> edge;
        //dd($memos);
        return Inertia::render("Memo/Edit", ["memo" => $memo, "edges" => $edges, "nodes" => $nodes]);
    }

    public function update(Request $request, Memo $memo)
    {
        $nodesData = $request->input('nodes', []);
        $edgesData = $request->input('edges', []);

        // クライアントの仮ID(UUID)と、DBの本当のID(int)を紐づける対応表
        $idMap = []; 

        try {
            DB::transaction(function () use ($nodesData, $edgesData, $memo, &$idMap) {

                // --- 1. ノードの処理 ---
                $existingNodeIds = [];

                // 1-1. 既存ノード（IDが数字）を更新
                foreach ($nodesData as $nodeData) {
                    if (is_numeric($nodeData['id'])) {
                        $existingNodeIds[] = $nodeData['id'];
                        $node = Node::find($nodeData['id']);
                        if ($node) {
                            $node->update([
                                'memo_id' => $memo['id'],
                                'position_x'     => $nodeData['position']['x'],
                                'position_y'     => $nodeData['position']['y'],
                                'prime_text' => $nodeData['data']['label'],
                                'type'  => $nodeData['type'],
                            ]);
                        }
                    }
                }

                // 1-2. 新規ノード（IDがUUID）を作成
                foreach ($nodesData as $nodeData) {
                    if (!is_numeric($nodeData['id'])) {
                        $clientTempId = $nodeData['id'];
                        
                        $newNode = $memo->node()->create([
                            'memo_id' => $memo['id'],
                            'position_x'     => $nodeData['position']['x'],
                            'position_y'     => $nodeData['position']['y'],
                            'prime_text' => $nodeData['data']['label'],
                            'type' => $nodeData['type'],
                        ]);
                        
                        // IDの対応表を作成: "クライアントのUUID" => "DBの新しい整数ID"
                        $idMap[$clientTempId] = $newNode->id;
                        $existingNodeIds[] = $newNode->id;
                    }
                }

                // 1-3. 削除されたノードをDBから消す
                $memo->node()->whereNotIn('id', $existingNodeIds)->delete();

                // --- 2. エッジの処理 ---
                $existingEdgeIds = [];
                foreach ($edgesData as $edgeData) {

                    // ID対応表を使って、エッジの接続先IDを正しいものに置き換える
                    $sourceId = $idMap[$edgeData['source']] ?? $edgeData['source'];
                    $targetId = $idMap[$edgeData['target']] ?? $edgeData['target'];

                    $edge = $memo->edge()->updateOrCreate(
                        ['start_node' => $sourceId, 'end_node' => $targetId, 'memo_id' => $memo['id'],],
                        [] // エッジに更新するデータがなければ空配列
                    );
                    $existingEdgeIds[] = $edge->id;
                }
                $memo->edge()->whereNotIn('id', $existingEdgeIds)->delete();
            });
        } catch (Throwable $e) {
            report($e);
            return back();
        }

        return redirect("/edit/" . $memo->id);
    }

    public function create(Memo $memo, Request $request)
    {

    }
    /*
    public function show(Post $post)
    {
        return Inertia::render("Post/Show", ["post" => $post]);
    }

    public function create(Category $category)
    {
        return Inertia::render("Post/Create", ["categories" => $category->get()]);
    }

    public function store(PostRequest $request, Post $post)
    {
        $input = $request->all();
        $post->fill($input)->save();
        return redirect("/posts/" . $post->id);
    }

    public function edit(Post $post)
    {
        return Inertia::render("Post/Edit", ["post" => $post]);
    }

    public function update(PostRequest $request, Post $post)
    {
        $input = $request->all();
        $post->fill($input)->save();
        return redirect("/posts/" . $post->id);
    }

    public function delete(Post $post){
        $post->delete();
        return redirect("/posts");
    }
    */
}
