using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SteamDealsController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public SteamDealsController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet("top-deals")]
    public async Task<IActionResult> GetTopDeals()
    {
        // **نکته:** API رسمی Steam برای دریافت تخفیف‌ها محدود است.
        // معمولاً از APIهای جایگزین مانند SteamSpy یا APIهای پولی دیگر استفاده می‌شود.
        // در اینجا ما یک پاسخ نمونه (Fake) را شبیه‌سازی می‌کنیم.
        // شما می‌توانید منطق واقعی فراخوانی API را در اینجا جایگزین کنید.

        var fakeDeals = new[]
        {
            new { name = "Cyberpunk 2077", discountPercent = 50, finalPrice = "29.99 USD", headerImage = "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg" },
            new { name = "Red Dead Redemption 2", discountPercent = 67, finalPrice = "19.79 USD", headerImage = "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg" },
            new { name = "The Witcher 3: Wild Hunt", discountPercent = 80, finalPrice = "7.99 USD", headerImage = "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg" },
            new { name = "Sekiro: Shadows Die Twice", discountPercent = 50, finalPrice = "29.99 USD", headerImage = "https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg" },
            new { name = "Hades", discountPercent = 50, finalPrice = "12.49 USD", headerImage = "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg" }
        };

        return Ok(fakeDeals);
    }
}