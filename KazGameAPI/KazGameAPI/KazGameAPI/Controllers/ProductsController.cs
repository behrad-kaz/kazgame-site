// KazGameAPI.Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using KazGameAPI.Data;
using KazGameAPI.Models; // برای مدل Product

namespace KazGameAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet] // Endpoint برای دریافت تمام محصولات
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            // برای اطمینان از اینکه همه فیلدها از جمله جدیدترین ها برگردانده شوند.
            // اگر FindAsync به تنهایی کافی نبود، از ToListAsync برای همه فیلدها استفاده کنید.
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }


        [HttpGet("{id}")] // این Endpoint برای فچ بر اساس ID باقی می‌ماند
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound(new { message = "محصول یافت نشد." });
            }
            return Ok(product);
        }

        [HttpGet("by-slug/{slug}")] // <--- **Endpoint جدید برای فچ بر اساس Slug**
        public async Task<ActionResult<Product>> GetProductBySlug(string slug)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Slug == slug);

            if (product == null)
            {
                return NotFound(new { message = "محصول با این Slug یافت نشد." });
            }

            return Ok(product);
        }
    }
}