<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MaterialController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'materials_folder' => 'required|file|mimes:pdf,docx,txt|max:10240',
    ]);

    if ($request->hasFile('materials_folder')) {
        $file = $request->file('materials_folder');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $uploadPath = public_path('materials');

        if (!File::exists($uploadPath)) {
            File::makeDirectory($uploadPath, 0777, true);
        }

        $file->move($uploadPath, $filename);
        $filePath =  $filename;

        Material::create([
            'class_id' => $request->input('class_id'),
            'materials_folder' => $filePath,
            'title' => $request->input('title'),
        ]);

        return back()->with('success', 'Material uploaded successfully');
    } else {
        return back()->with('error', 'Material not uploaded successfully');
    }
}

}
