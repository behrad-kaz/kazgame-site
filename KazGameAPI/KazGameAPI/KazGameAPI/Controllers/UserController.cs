using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using System; // برای Guid
using BCrypt.Net; // برای BCrypt

using KazGameAPI.Data;   // برای AppDbContext
using KazGameAPI.Models; // برای User, UserDto, LoginDto

namespace KazGameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public UserController(AppDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new { message = string.Join(" | ", errors) });
            }

            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "این ایمیل قبلاً ثبت شده است." });
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Password = hashedPassword
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "ثبت‌نام با موفقیت انجام شد." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "ایمیل یا رمز عبور اشتباه است." });
            }

            return Ok(new
            {
                message = "ورود با موفقیت انجام شد.",
                fullName = user.FullName,
                userId = user.Id,
                avatarUrl = user.AvatarUrl
            });
        }

        [HttpPost("upload-avatar/{userId}")]
        public async Task<IActionResult> UploadAvatar(int userId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "فایلی ارسال نشده است." });
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "کاربر یافت نشد." });
            }

            var uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "avatars");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            if (!string.IsNullOrEmpty(user.AvatarUrl) && System.IO.File.Exists(Path.Combine(_hostingEnvironment.WebRootPath, user.AvatarUrl.TrimStart('/'))))
            {
                System.IO.File.Delete(Path.Combine(_hostingEnvironment.WebRootPath, user.AvatarUrl.TrimStart('/')));
            }

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            user.AvatarUrl = "/avatars/" + uniqueFileName;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "آواتار با موفقیت آپلود شد.", avatarUrl = user.AvatarUrl });
        }
    }
}