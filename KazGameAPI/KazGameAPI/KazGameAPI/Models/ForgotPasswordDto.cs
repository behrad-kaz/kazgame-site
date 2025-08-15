// KazGameAPI/Models/ForgotPasswordDto.cs
using System.ComponentModel.DataAnnotations;

namespace KazGameAPI.Models
{
    public class ForgotPasswordDto
    {
        [Required(ErrorMessage = "ایمیل الزامی است.")]
        [EmailAddress(ErrorMessage = "ایمیل معتبر وارد کنید.")]
        public string Email { get; set; } = string.Empty;
    }
}