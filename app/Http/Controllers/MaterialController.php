<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;
use App\Models\ClassModel;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Notifications\NewMaterialNotification;

class MaterialController extends Controller
{
    public function store(Request $request)
{
    // dd($request->all());
    $request->validate([
        'title' => 'required|string|max:255',
        'materials_folder' => 'required|file|mimes:pdf,docx,txt,ppt,pptx|max:10240',
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

        $material = Material::create([
            'class_id' => $request->input('class_id'),
            'materials_folder' => $filePath,
            'title' => $request->input('title'),
        ]);

        // Notify all students in the class
        $class = ClassModel::with('students')->find($request->input('class_id'));
        if ($class) {
            foreach ($class->students as $student) {
                $student->notify(new NewMaterialNotification($material));
            }
        }

        return back()->with('success', 'Material uploaded successfully');
    } else {
        return back()->with('error', 'Material not uploaded successfully');
    }
}

}
