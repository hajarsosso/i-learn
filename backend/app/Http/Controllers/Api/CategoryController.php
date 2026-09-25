<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GET ALL CATEGORIES
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE CATEGORY
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
    ]);

    $category = Category::create([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
    ]);

    return response()->json([
        'message' => 'Category created successfully',
        'category' => $category,
    ], 201);
}


    public function destroy($id)
{
    $category = Category::findOrFail($id);

    $category->delete();

    return response()->json([
        'message' => 'Category deleted'
    ]);
}
}