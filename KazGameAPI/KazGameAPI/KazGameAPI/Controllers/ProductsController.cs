// ProductApi.Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using ProductApi.Data;
using ProductApi.Models;
using Microsoft.EntityFrameworkCore; // برای استفاده از FindAsync یا FirstOrDefaultAsync

namespace ProductAppL.Controllers
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
        public ActionResult<IEnumerable<Product>> GetAll()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        [HttpGet("{id}")] // <--- Endpoint جدید برای دریافت یک محصول بر اساس ID
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id); // یا FirstOrDefaultAsync(p => p.Id == id)

            if (product == null)
            {
                return NotFound(new { message = "محصول یافت نشد." });
            }

            return Ok(product);
        }
    }
}