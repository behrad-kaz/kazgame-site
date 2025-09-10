using KazGameAPI.Data; // <--- این خط باید باشد
using Microsoft.AspNetCore.Hosting; // برای IWebHostEnvironment (در User Controller)
using Microsoft.EntityFrameworkCore;
using KazGameAPI.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// اتصال به دیتابیس
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// سایر سرویس‌ها
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // **** این بخش کلیدی و به احتمال زیاد فراموش شده یا ناقص است ****
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "KazGame API",           // نام API شما
        Version = "v1",                  // نسخه
        Description = "API for the KazGame website and services" // توضیحات دلخواه
    });
});
builder.Services.AddAuthorization();



// اضافه کردن CORS به سرویس‌ها
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddSingleton<EmailService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        // این خط به Swagger UI می‌گوید فایل JSON را از کجا بخواند
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "KazGame API v1");

        // این خط مشخص می‌کند که Swagger در چه آدرسی نمایش داده شود
        // آدرس شما /swagger/index.html است، پس این تنظیم صحیح است
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // <--- برای سرو کردن فایل‌های استاتیک (آواتارها)
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();