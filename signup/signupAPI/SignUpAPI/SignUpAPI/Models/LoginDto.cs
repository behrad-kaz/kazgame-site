using System.ComponentModel.DataAnnotations;

public class LoginDto
{
    [Required(ErrorMessage = "ایمیل الزامی است.")]
    [EmailAddress(ErrorMessage = "ایمیل معتبر وارد کنید.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "رمز عبور الزامی است.")]
    public string Password { get; set; }
}
