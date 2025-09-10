// KazGameAPI/Controllers/NewsArticlesController.cs
using KazGameAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using static NewsArticle;

[ApiController]
[Route("api/[controller]")]
public class NewsArticlesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NewsArticlesController(AppDbContext context)
    {
        _context = context;
    }

    // دریافت لیست خلاصه‌ای از آخرین اخبار (برای صفحه اصلی)
    [HttpGet]
    public async Task<IActionResult> GetRecentArticles([FromQuery] int count = 5)
    {
        var articles = await _context.NewsArticles
            .OrderByDescending(a => a.PublishedDate)
            .Take(count)
            .Select(a => new { // فقط اطلاعات ضروری را برمی‌گردانیم
                a.Id,
                a.Title,
                a.Slug,
                a.Summary,
                a.ImageUrl,
                a.PublishedDate,
                a.Category
            })
            .ToListAsync();

        return Ok(articles);
    }

    // دریافت جزئیات کامل یک خبر خاص با استفاده از Slug
    [HttpGet("by-slug/{slug}")]
    public async Task<IActionResult> GetArticleBySlug(string slug, [FromQuery] int? userId)
    {
        var article = await _context.NewsArticles.FirstOrDefaultAsync(a => a.Slug == slug);
        if (article == null) return NotFound();

        // افزایش شمارنده بازدید
        article.ViewCount++;
        await _context.SaveChangesAsync();

        var likeCount = await _context.UserLikedArticles.CountAsync(l => l.ArticleId == article.Id);
        bool isLikedByCurrentUser = userId.HasValue &&
            await _context.UserLikedArticles.AnyAsync(l => l.ArticleId == article.Id && l.UserId == userId.Value);

        var articleDetail = new
        {
            Article = article,
            LikeCount = likeCount,
            IsLiked = isLikedByCurrentUser
        };
        return Ok(articleDetail);
    }

    // Endpoint برای لایک کردن
    [HttpPost("{articleId}/like")]
    public async Task<IActionResult> LikeArticle(int articleId, [FromBody] LikeDto dto)
    {
        var alreadyLiked = await _context.UserLikedArticles
            .AnyAsync(l => l.ArticleId == articleId && l.UserId == dto.UserId);
        if (alreadyLiked) return Ok(); // اگر قبلا لایک کرده، کاری نکن

        var like = new UserLikedArticle { ArticleId = articleId, UserId = dto.UserId };
        _context.UserLikedArticles.Add(like);
        await _context.SaveChangesAsync();
        return Ok();
    }

    // Endpoint برای آنلایک کردن
    [HttpDelete("{articleId}/like/{userId}")]
    public async Task<IActionResult> UnlikeArticle(int articleId, int userId)
    {
        var like = await _context.UserLikedArticles
            .FirstOrDefaultAsync(l => l.ArticleId == articleId && l.UserId == userId);
        if (like != null)
        {
            _context.UserLikedArticles.Remove(like);
            await _context.SaveChangesAsync();
        }
        return Ok();
    }
}
public class LikeDto { public int UserId { get; set; } }