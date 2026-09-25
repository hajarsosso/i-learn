<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'quiz_id',
        'text',
        'points',
        'correct_answer',
        'options',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
    public function answers()
{
    return $this->hasMany(Answer::class);
}
}