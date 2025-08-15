// KazGameAPI/Models/ResetPasswordDto.cs
using System.ComponentModel.DataAnnotations;

namespace KazGameAPI.Models
{
    public class ResetPasswordDto
    {
        [Required(ErrorMessage = "رمز عبور جدید الزامی است.")]
        public string NewPassword { get; set; } = string.Empty;

        // <--- **توجه: اینجا توکن بازیابی (Reset Token) هم نیاز است**
        // برای سادگی، فعلاً فرض می‌کنیم UserId را از فرانت‌اند می‌گیریم و یک توکن به آن مرتبط می‌کنیم.
        [Required]
        public string ResetToken { get; set; } = string.Empty;
    }
}