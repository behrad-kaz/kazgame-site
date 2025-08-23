// KazGameAPI/Models/NewsArticle.cs
using System;

public class NewsArticle
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Slug { get; set; } // برای URLهای خوانا مانند /news/cyberpunk-update
    public string Summary { get; set; } // خلاصه خبر برای نمایش در صفحه اصلی
    public string Content { get; set; } // متن کامل خبر
    public string ImageUrl { get; set; }
    public string Author { get; set; }
    public DateTime PublishedDate { get; set; }
    public string? Category { get; set; } // دسته‌بندی
}