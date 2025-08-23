// KazGameAPI/Controllers/NewsArticlesController.cs
using KazGameAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

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
    [HttpGet("{slug}")]
    public async Task<IActionResult> GetArticleBySlug(string slug)
    {
        var article = await _context.NewsArticles.FirstOrDefaultAsync(a => a.Slug == slug);

        if (article == null)
        {
            return NotFound();
        }

        return Ok(article);
    }
}