<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'title' => $this->title,

            'description' => $this->description,

            'thumbnail_url' => $this->thumbnail_url,

            'status' => $this->status,

            'lessons_count' => $this->lessons_count,

            'students_count' => $this->students_count,

            'total_duration' => $this->total_duration,

            'progress_percent' => $this->progress_percent ?? 0,

            'completed_lessons' => $this->completed_lessons ?? [],

            'is_enrolled' => $this->is_enrolled ?? false,

            'teacher' => [
                'id' => $this->teacher?->id,
                'name' => $this->teacher?->name,
            ],

            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],

            'lessons' => $this->lessons,

            'created_at' => $this->created_at,
        ];
    }
}