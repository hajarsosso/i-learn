<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'thumbnail',
        'status',
        'teacher_id',
        'category_id',
    ];

    protected $appends = [
        'thumbnail_url'
    ];

    /**
     * Teacher relationship
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Category relationship
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Lessons relationship
     */
    public function lessons()
    {
        return $this->hasMany(Lesson::class)
            ->orderBy('order');
    }

    /**
     * Enrollments relationship
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    /**
     * Thumbnail accessor
     */
    public function getThumbnailUrlAttribute()
    {
        if (!$this->thumbnail) {
            return null;
        }

        return asset('storage/' . $this->thumbnail);
    }
}
