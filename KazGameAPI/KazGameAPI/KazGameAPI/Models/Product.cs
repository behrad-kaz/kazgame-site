namespace KazGameAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; } // تصویر اصلی کارت بازی
        public string? VideoUrl { get; set; } // ویدیوی اصلی بازی (تریلر)
        public decimal? Price { get; set; }

        public string? GalleryImagesJson { get; set; } // آدرس تصاویر گالری به صورت JSON string
        public string? BackgroundImageUrl { get; set; } // تصویر پس‌زمینه برای GameOverviewSection
        public string? MainPageVideoUrl { get; set; }
    }
}