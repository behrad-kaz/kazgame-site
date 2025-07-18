using System.ComponentModel.DataAnnotations;

namespace KazGameAPI.Models
{
    public class UserDto
    {
        [Required(ErrorMessage = "نام کامل الزامی است.")]
        [MaxLength(100, ErrorMessage = "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.")]
        public string FullName { get; set; } = string.Empty; // اضافه کردن = string.Empty

        [Required(ErrorMessage = "ایمیل الزامی است.")]
        [EmailAddress(ErrorMessage = "ایمیل معتبر وارد کنید.")]
        public string Email { get; set; } = string.Empty; // اضافه کردن = string.Empty

        [Required(ErrorMessage = "رمز عبور الزامی است.")]
        [MinLength(6, ErrorMessage = "رمز عبور باید حداقل ۶ کاراکتر باشد.")]
        [RegularExpression(@"^(?=.*[a-zA-Z])(?=.*\d).+$", ErrorMessage = "رمز باید شامل حرف و عدد باشد.")]
        public string Password { get; set; } = string.Empty; // اضافه کردن = string.Empty
    }
}