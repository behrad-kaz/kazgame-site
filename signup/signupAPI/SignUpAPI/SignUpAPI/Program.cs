using Microsoft.EntityFrameworkCore;
using KazGameAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// اتصال به دیتابیس
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// سایر سرویس‌ها
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization(); // اگر نیاز دارید
// 1. اضافه کردن CORS به سرویس‌ها
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting(); 
app.UseCors("AllowAll");
app.UseAuthentication(); 
app.UseAuthorization();
app.MapControllers();
app.Run();


