using BCrypt.Net; // برای BCrypt
using KazGameAPI.Data;   // برای AppDbContext
using KazGameAPI.Models; // برای User, UserDto, LoginDto
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System; // برای Guid
using System.IO;
using System.Linq;
using KazGameAPI.Services;

namespace KazGameAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly EmailService _emailService;

        public UserController(AppDbContext context, IWebHostEnvironment hostingEnvironment, EmailService emailService)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
            _emailService = emailService;
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

            try
            {
                await _emailService.SendWelcomeEmailAsync(user.Email, user.FullName);
            }
            catch (Exception ex)
            {
                // ایمیل ارسال نشد، اما ثبت‌نام موفق بود. می‌توانید خطا را لاگ کنید.
                Console.WriteLine($"Failed to send welcome email to {user.Email}: {ex.Message}");
            }

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
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
            {
                // برای امنیت، نباید بگوییم که آیا ایمیل در دیتابیس است یا خیر.
                return Ok(new { message = "اگر ایمیل معتبر باشد، لینک بازیابی رمز ارسال خواهد شد." });
            }

            // تولید توکن و تاریخ انقضا
            user.ResetToken = Guid.NewGuid().ToString();
            user.ResetTokenExpires = DateTime.UtcNow.AddMinutes(30); // توکن تا 30 دقیقه دیگر منقضی می شود

            await _context.SaveChangesAsync();

            // ارسال ایمیل
            try
            {
                await _emailService.SendPasswordResetEmailAsync(user.Email, user.FullName, user.ResetToken);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending password reset email: {ex.Message}");
            }

            return Ok(new { message = "اگر ایمیل معتبر باشد، لینک بازیابی رمز ارسال خواهد شد." });
        }

        // **Endpoint جدید برای تغییر رمز عبور**
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ResetToken == dto.ResetToken && u.ResetTokenExpires > DateTime.UtcNow);

            if (user == null)
            {
                return BadRequest(new { message = "لینک تغییر رمز نامعتبر یا منقضی شده است." });
            }

            // هش کردن رمز عبور جدید و ذخیره
            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.ResetToken = null; // توکن را پس از استفاده پاک کن
            user.ResetTokenExpires = null; // تاریخ انقضا را پاک کن

            await _context.SaveChangesAsync();

            return Ok(new { message = "رمز عبور با موفقیت تغییر یافت." });
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