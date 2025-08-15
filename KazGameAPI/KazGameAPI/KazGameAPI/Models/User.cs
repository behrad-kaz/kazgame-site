namespace KazGameAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public string? ResetToken { get; set; } // <--- **فیلد جدید برای توکن بازیابی رمز عبور**
        public DateTime? ResetTokenExpires { get; set; } // تاریخ انقضای توکن (برای امنیت)
    }
}