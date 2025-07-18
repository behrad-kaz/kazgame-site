﻿using System;
using System.ComponentModel.DataAnnotations;

namespace KazGameAPI.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        [Required(ErrorMessage = "متن کامنت الزامی است.")]
        [MaxLength(500, ErrorMessage = "کامنت نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.")]
        public string Text { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    public class CommentDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
    }
}