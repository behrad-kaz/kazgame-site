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

        // <--- **فیلدهای جدید برای توضیحات کامل و تصاویر میانی و ویژگی‌ها**
        public string? FullDescription { get; set; } // متن کامل توضیحات بازی
        public string? MiddleImagesJson { get; set; } // آدرس تصاویر میانی به صورت JSON string
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public string? ReleaseDate { get; set; }
        public string? Genre { get; set; }
        public string? Rating { get; set; }

        public string? MainPageVideoUrl { get; set; }
        public string? Pegi { get; set; }
        // <--- **پایان فیلدهای جدید**
    }
}