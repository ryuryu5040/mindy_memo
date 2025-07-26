<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Memo;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

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
        return Inertia::render("Memo/Edit", ["memo" => $memo]);
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
