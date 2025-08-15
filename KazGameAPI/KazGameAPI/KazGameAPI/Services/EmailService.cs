// KazGameAPI/Services/EmailService.cs
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace KazGameAPI.Services
{
    public class EmailSettings
    {
        public string SmtpServer { get; set; } = string.Empty;
        public int SmtpPort { get; set; }
        public string SenderName { get; set; } = string.Empty;
        public string SenderEmail { get; set; } = string.Empty;
        public string SmtpUsername { get; set; } = string.Empty;
        public string SmtpPassword { get; set; } = string.Empty;
    }

    public class EmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }
        public async Task SendPasswordResetEmailAsync(string toEmail, string fullName, string resetToken)
        {
            var resetLink = $"https://localhost:5173/reset-password?token={resetToken}"; // <--- **این آدرس را با آدرس صفحه React خود جایگزین کنید**
            var subject = "بازیابی رمز عبور حساب کاربری شما در KazGAME";
            var body = $"<p>سلام {fullName},</p>" +
                       "<p>شما درخواست بازیابی رمز عبور حساب کاربری خود را داده‌اید. لطفاً برای تغییر رمز، روی لینک زیر کلیک کنید:</p>" +
                       $"<p><a href='{resetLink}'>تغییر رمز عبور</a></p>" +
                       "<p>اگر این درخواست توسط شما ارسال نشده است، لطفاً این ایمیل را نادیده بگیرید.</p>" +
                       "<p>این لینک تا 30 دقیقه دیگر منقضی خواهد شد.</p>" +
                       "<p>با احترام،<br>تیم پشتیبانی KazGAME</p>";

            await SendEmailAsync(toEmail, subject, body);
        }

        public async Task SendWelcomeEmailAsync(string toEmail, string fullName)
        {
            var subject = "خوش آمدید به سایت KazGAME!";
            var body = $"<p>سلام {fullName},</p>" +
                       "<p>به خانواده بزرگ KazGAME خوش آمدید!</p>" +
                       "<p>از اینکه به جمع ما پیوستید، بسیار خوشحالیم. شما اکنون می‌توانید از تمامی امکانات سایت ما استفاده کنید و به دنیای بازی‌های کامپیوتری وارد شوید.</p>" +
                       "<p>با احترام،<br>تیم پشتیبانی KazGAME</p>";

            await SendEmailAsync(toEmail, subject, body);
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName);
            mailMessage.To.Add(toEmail);
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            mailMessage.IsBodyHtml = true;

            using var smtpClient = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort)
            {
                Credentials = new NetworkCredential(_emailSettings.SmtpUsername, _emailSettings.SmtpPassword),
                EnableSsl = true
            };

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (SmtpException ex)
            {
                // لاگ کردن خطا برای دیباگ
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw;
            }
        }
    }
}