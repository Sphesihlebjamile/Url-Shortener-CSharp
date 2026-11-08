namespace Backend.Infrastructure.Plans;

public sealed class LongUrlPlan :
    ILongUrlPlan
{
    public readonly IUrlShortenerDb _urlShortenerDb;

    public LongUrlPlan(
        IUrlShortenerDb urlShortenerDb)
    {
        _urlShortenerDb = urlShortenerDb;
    }

    public async Task<LongUrlOutput> ExecuteAsync(string shortUrl)
    {
        // Get the long Url from the database using the short URL
        var longUrl = await _urlShortenerDb.GetLongUrlByShortUrlCode(shortUrl, default);

        return new LongUrlOutput(longUrl);
    }
}
