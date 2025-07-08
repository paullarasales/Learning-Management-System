<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\Choice;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.correct_choice' => 'required|in:A,B,C,D',
            'questions.*.choices' => 'required|array|size:4',
            'questions.*.choices.*.label' => 'required|in:A,B,C,D',
            'questions.*.choices.*.text' => 'required|string'
        ]);

        $quiz = Quiz::create([
            'class_id' => $validated['class_id'],
            'title' => $validated['title'],
            'description' => $validated['description']
        ]);

        forEach ($validated['questions'] as $q) {
            $question = $quiz->questions()->create([
                'question_text' => $q['question_text'],
                'correct_choice' => $q['correct_choice'],
            ]);

            $question->choices()->createMany($q['choices']);
        }

        return back()->with('success', 'Quiz created');
    }
}
