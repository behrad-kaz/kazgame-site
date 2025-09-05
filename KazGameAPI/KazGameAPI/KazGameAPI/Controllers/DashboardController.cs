// KazGameAPI/Controllers/DashboardController.cs
using KazGameAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
// مطمئن شوید using مربوط به DbContext شما اینجا باشد
// مثال: using KazGameAPI.Data;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = new DashboardStatsDto
        {
            TotalGames = await _context.Products.CountAsync(),
            TotalNews = await _context.NewsArticles.CountAsync(),
            TotalUsers = await _context.Users.CountAsync()
        };

        return Ok(stats);
    }
}