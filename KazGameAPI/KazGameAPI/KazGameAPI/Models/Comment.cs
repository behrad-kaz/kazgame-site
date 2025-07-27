// KazGameAPI.Models/Comment.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace KazGameAPI.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public int GameId { get; set; } // <--- **فیلد جدید: ID بازی مربوط به کامنت**
        [Required(ErrorMessage = "متن کامنت الزامی است.")]
        [MaxLength(500, ErrorMessage = "کامنت نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.")]
        public string Text { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    public class CommentDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public int GameId { get; set; } // <--- **فیلد جدید در DTO**
        public string Text { get; set; } = string.Empty;
    }
}