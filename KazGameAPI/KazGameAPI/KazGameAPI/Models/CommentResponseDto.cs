using System;

namespace KazGameAPI.Models
{
    public class CommentResponseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public string? UserAvatarUrl { get; set; }
        public int GameId { get; set; } 
    }
}