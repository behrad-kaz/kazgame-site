using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System; // برای DateTime

using KazGameAPI.Data;   // برای AppDbContext
using KazGameAPI.Models; // برای Comment, User, CommentDto, CommentResponseDto

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentResponseDto>>> GetComments()
        {
            var comments = await _context.Comments
                .OrderByDescending(c => c.Timestamp)
                .Join(
                    _context.Users,
                    comment => comment.UserId,
                    user => user.Id,
                    (comment, user) => new CommentResponseDto
                    {
                        Id = comment.Id,
                        UserId = comment.UserId,
                        FullName = comment.FullName, // از مدل Comment (که از دیتابیس می آید)
                        Text = comment.Text,
                        Timestamp = comment.Timestamp,
                        UserAvatarUrl = user.AvatarUrl // از مدل User
                    }
                )
                .ToListAsync();

            return Ok(comments);
        }

        [HttpPost]
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
                FullName = user.FullName, // از FullName کاربر دیتابیس استفاده کن
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
                    Text = comment.Text,
                    Timestamp = comment.Timestamp,
                    UserAvatarUrl = user.AvatarUrl
                }
            });
        }
    }
}