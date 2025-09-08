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

        [HttpGet] // Endpoint برای دریافت تمام محصولات با صفحه‌بندی
        public async Task<ActionResult<PagedResult<Product>>> GetAll(
             [FromQuery] int pageNumber = 1, // شماره صفحه (پیش‌فرض 1)
             [FromQuery] int pageSize = 16)  // تعداد آیتم در هر صفحه (پیش‌فرض 16)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 16; // حداقل 16 آیتم در صفحه
            if (pageSize > 100) pageSize = 100; // حداکثر 100 آیتم در صفحه

            var query = _context.Products.AsQueryable();
            var totalCount = await query.CountAsync(); // تعداد کل آیتم‌ها

            var products = await query
                .Skip((pageNumber - 1) * pageSize) // رد کردن آیتم‌های صفحات قبلی
                .Take(pageSize) // گرفتن آیتم‌های صفحه فعلی
                .ToListAsync();

            var pagedResult = new PagedResult<Product> // ساخت شیء نتیجه صفحه‌بندی شده
            {
                Items = products,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };

            return Ok(pagedResult);
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
        [HttpGet("by-slug/{slug}")]
        public async Task<ActionResult> GetProductBySlug(string slug, [FromQuery] int? userId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Slug == slug);

            if (product == null)
            {
                return NotFound(new { message = "محصول با این Slug یافت نشد." });
            }

            bool isLikedByCurrentUser = false;
            if (userId.HasValue)
            {
                isLikedByCurrentUser = await _context.UserFavoriteGames
                    .AnyAsync(f => f.UserId == userId.Value && f.ProductId == product.Id);
            }

            // **مهم:** ما دیگر خود محصول را به تنهایی برنمی‌گردانیم
            // بلکه یک آبجکت جدید که شامل محصول و وضعیت لایک است را برمی‌گردانیم
            var productDetail = new
            {
                // تمام پراپرتی‌های محصول را به صورت جداگانه ارسال می‌کنیم تا در فرانت‌اند راحت‌تر باشیم
                // این کار از ایجاد آبجکت تودرتوی Product.product جلوگیری می‌کند
                Id = product.Id,
                Title = product.Title,
                Slug = product.Slug,
                Description = product.Description,
                ImageUrl = product.ImageUrl,
                VideoUrl = product.VideoUrl,
                Price = product.Price,
                GalleryImagesJson = product.GalleryImagesJson,
                BackgroundImageUrl = product.BackgroundImageUrl,
                MainPageVideoUrl = product.MainPageVideoUrl,
                FullDescription = product.FullDescription,
                MiddleImagesJson = product.MiddleImagesJson,
                Developer = product.Developer,
                Publisher = product.Publisher,
                ReleaseDate = product.ReleaseDate,
                Genre = product.Genre,
                Rating = product.Rating,
                Pegi = product.Pegi,
                MinOS = product.MinOS,
                MinProcessor = product.MinProcessor,
                MinMemory = product.MinMemory,
                MinGraphics = product.MinGraphics,
                MinStorage = product.MinStorage,
                MinDirectX = product.MinDirectX,
                RecOS = product.RecOS,
                RecProcessor = product.RecProcessor,
                RecMemory = product.RecMemory,
                RecGraphics = product.RecGraphics,
                RecStorage = product.RecStorage,
                RecDirectX = product.RecDirectX,
                DownloadLinksJson = product.DownloadLinksJson,
                IsFeatured = product.IsFeatured,
                // و در نهایت، وضعیت لایک
                IsLiked = isLikedByCurrentUser
            };

            return Ok(productDetail);
        }
        [HttpGet("latest-releases")]
        public async Task<IActionResult> GetLatestReleases([FromQuery] int count = 5)
        {
            var latestProducts = await _context.Products
                .OrderByDescending(p => p.ReleaseDate) // فرض می‌کنیم فیلد ReleaseDate دارید
                .Take(count)
                .ToListAsync();

            return Ok(latestProducts);
        }
        [HttpGet("search")] // مسیر: /api/Products/search?q=searchterm
        public async Task<ActionResult<IEnumerable<Product>>> Search([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                // اگر عبارت جستجو خالی بود، لیست خالی برگردان
                return Ok(new List<Product>());
            }

            var products = await _context.Products
                .Where(p => p.Title.Contains(q) || p.Description.Contains(q)) // جستجو در عنوان و توضیحات
                .Take(10) // حداکثر 10 نتیجه
                .ToListAsync();

            return Ok(products);
        }
        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedProducts()
        {
            var featuredProducts = await _context.Products
                .Where(p => p.IsFeatured == true)
                .OrderByDescending(p => p.ReleaseDate) // یا هر ترتیب دیگری که می‌خواهید
                .Take(10) // حداکثر ۱۰ محصول ویژه
                .ToListAsync();

            return Ok(featuredProducts);
        }
    }
}