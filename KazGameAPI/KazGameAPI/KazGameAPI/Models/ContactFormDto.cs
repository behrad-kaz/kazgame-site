namespace KazGameAPI.Models
{
    public class ContactFormDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
        public string Captcha { get; set; }
    }
}
