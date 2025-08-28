// KazGameAPI/Controllers/ContactController.cs
using KazGameAPI.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public ContactController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMessage([FromBody] ContactFormDto formData)
    {

        try
        {
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(smtpSettings["SenderName"], smtpSettings["SenderEmail"]));
            message.To.Add(new MailboxAddress("Admin", smtpSettings["SenderEmail"])); // ایمیل به خودتان ارسال می‌شود
            message.Subject = $"New Contact Message from {formData.FullName}";

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $@"
                <h2>New message from KazGame Contact Form</h2>
                <p><strong>Name:</strong> {formData.FullName}</p>
                <p><strong>Email:</strong> {formData.Email}</p>
                <p><strong>Phone:</strong> {formData.PhoneNumber}</p>
                <hr/>
                <h3>Message:</h3>
                <p>{formData.Message}</p>";

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(smtpSettings["Server"], int.Parse(smtpSettings["Port"]), MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(smtpSettings["Username"], smtpSettings["Password"]);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }

            return Ok(new { message = "پیام شما با موفقیت ارسال شد." });
        }
        catch (Exception ex)
        {
            // Log the error in a real app
            return StatusCode(500, new { message = $"خطا در ارسال ایمیل: {ex.Message}" });
        }
    }
}