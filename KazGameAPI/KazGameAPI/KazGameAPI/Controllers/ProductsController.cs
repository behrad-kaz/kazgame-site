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

        [HttpGet("{id}")] // Endpoint جدید برای دریافت یک محصول بر اساس ID
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            // این FindAsync باید تمام فیلدها را برگرداند.
            var product = await _context.Products.FindAsync(id);

            // **LOG برای دیباگ در API**
            Console.WriteLine($"API: GetProductById called for ID: {id}");
            if (product != null)
            {
                Console.WriteLine($"API: Product found - Title: {product.Title}, Genre: {product.Genre ?? "null"}, Developer: {product.Developer ?? "null"}, FullDescription: {product.FullDescription ?? "null"}");
                Console.WriteLine($"API: MainPageVideoUrl: {product.MainPageVideoUrl ?? "null"}");
                Console.WriteLine($"API: GalleryImagesJson: {product.GalleryImagesJson ?? "null"}");
            }
            else
            {
                Console.WriteLine($"API: Product with ID {id} not found.");
            }
            // **پایان LOG برای دیباگ**


            if (product == null)
            {
                return NotFound(new { message = "محصول یافت نشد." });
            }

            return Ok(product);
        }
    }
}
