namespace KazGameAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Slug { get; set; } // آدرس URL-friendly برای بازی
        public string? Description { get; set; }
        public string? ImageUrl { get; set; } // تصویر اصلی کارت بازی
        public string? VideoUrl { get; set; } // ویدیوی اصلی بازی (تریلر)
        public decimal? Price { get; set; }

        public string? GalleryImagesJson { get; set; } // آدرس تصاویر گالری به صورت JSON string
        public string? BackgroundImageUrl { get; set; } // تصویر پس‌زمینه برای GameOverviewSection

        public string? FullDescription { get; set; }
        public string? MiddleImagesJson { get; set; } 
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public string? ReleaseDate { get; set; }
        public string? Genre { get; set; } 
        public string? Rating { get; set; }

        public string? MainPageVideoUrl { get; set; }
        public string? Pegi { get; set; }


        // **فیلدهای جدید برای سیستم مورد نیاز**
        public string? MinOS { get; set; }
        public string? MinProcessor { get; set; }
        public string? MinMemory { get; set; }
        public string? MinGraphics { get; set; }
        public string? MinStorage { get; set; }
        public string? MinDirectX { get; set; }

        public string? RecOS { get; set; }
        public string? RecProcessor { get; set; }
        public string? RecMemory { get; set; }
        public string? RecGraphics { get; set; }
        public string? RecStorage { get; set; }
        public string? RecDirectX { get; set; }
        public string? DownloadLinksJson { get; set; } // لینک‌های دانلود به صورت JSON string
        public string? RelatedGameIdsJson { get; set; }
        // <--- **پایان فیلد جدید**
    }


    public class DownloadLink
    {
        public int PartNumber { get; set; }
        public string Url { get; set; } = string.Empty;
        public string? FileSize { get; set; } // مثلا "2 GB"
        public string? Password { get; set; } // رمز عبور برای لینک (اگر نیاز باشد)
    }
}
