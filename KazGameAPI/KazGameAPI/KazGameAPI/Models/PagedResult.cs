// KazGameAPI.Models/PagedResult.cs
using System.Collections.Generic;

namespace KazGameAPI.Models
{
    public class PagedResult<T> // T می‌تواند Product باشد
    {
        public IEnumerable<T> Items { get; set; } = new List<T>(); // آیتم‌های صفحه فعلی
        public int TotalCount { get; set; } // تعداد کل آیتم‌ها
        public int PageNumber { get; set; } // شماره صفحه فعلی
        public int PageSize { get; set; } // تعداد آیتم در هر صفحه
        public int TotalPages { get; set; } // تعداد کل صفحات
    }
}