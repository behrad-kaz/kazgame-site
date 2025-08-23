using KazGameAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // **** این خط برای رفع خطا باید اضافه شود ****
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PollsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PollsController(AppDbContext context) { _context = context; }

    [HttpGet("active")]
    public async Task<IActionResult> GetActivePoll()
    {
        var activePoll = await _context.Polls.FirstOrDefaultAsync(p => p.IsActive);
        if (activePoll == null) return NotFound();
        return Ok(activePoll);
    }

    [HttpPost("{id}/vote/{option}")]
    public async Task<IActionResult> Vote(int id, string option)
    {
        var poll = await _context.Polls.FindAsync(id);
        if (poll == null) return NotFound();

        if (option.ToUpper() == "A") poll.OptionAVotes++;
        else if (option.ToUpper() == "B") poll.OptionBVotes++;
        else return BadRequest("Invalid option.");

        await _context.SaveChangesAsync();
        return Ok(poll);
    }
}