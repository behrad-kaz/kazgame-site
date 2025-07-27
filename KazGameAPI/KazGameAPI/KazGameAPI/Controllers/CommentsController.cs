// KazGameAPI.Controllers/CommentsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

using KazGameAPI.Data;
using KazGameAPI.Models;

namespace KazGameAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        // **اصلاح: GetComments حالا می‌تواند GameId را به عنوان پارامتر دریافت کند**
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentResponseDto>>> GetComments([FromQuery] int? gameId)
        {
            IQueryable<Comment> query = _context.Comments;

            if (gameId.HasValue)
            {
                query = query.Where(c => c.GameId == gameId.Value); // <--- فیلتر کردن بر اساس GameId
            }

            var comments = await query
                .OrderByDescending(c => c.Timestamp)
                .Join(
                    _context.Users,
                    comment => comment.UserId,
                    user => user.Id,
                    (comment, user) => new CommentResponseDto
                    {
                        Id = comment.Id,
                        UserId = comment.UserId,
                        FullName = comment.FullName,
                        Text = comment.Text,
                        Timestamp = comment.Timestamp,
                        UserAvatarUrl = user.AvatarUrl // از مدل User
                    }
                )
                .ToListAsync();

            return Ok(comments);
        }

        [HttpPost] // ارسال کامنت جدید
        public async Task<IActionResult> PostComment([FromBody] CommentDto commentDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return BadRequest(new { message = string.Join(" | ", errors) });
            }

            var user = await _context.Users.FindAsync(commentDto.UserId);
            if (user == null)
            {
                return Unauthorized(new { message = "کاربر نامعتبر است." });
            }

            var comment = new Comment
            {
                UserId = commentDto.UserId,
                FullName = user.FullName,
                GameId = commentDto.GameId, // <--- **اضافه شد: دریافت GameId از DTO**
                Text = commentDto.Text,
                Timestamp = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return StatusCode(201, new
            {
                message = "کامنت با موفقیت ارسال شد.",
                comment = new CommentResponseDto
                {
                    Id = comment.Id,
                    UserId = comment.UserId,
                    FullName = comment.FullName,
                    GameId = comment.GameId, // <--- **اضافه شد: GameId در پاسخ**
                    Text = comment.Text,
                    Timestamp = comment.Timestamp,
                    UserAvatarUrl = user.AvatarUrl
                }
            });
        }
    }
}