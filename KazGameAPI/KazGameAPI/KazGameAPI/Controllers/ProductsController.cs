using Microsoft.AspNetCore.Mvc;
using ProductApi.Data;
using ProductApi.Models;


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
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll()
        {
            var products = _context.Products.ToList();
            return Ok(products); 
        }
    }
}
