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

    public async Task<LongUrlOutput> ExecuteAsync(string shortUrlCode)
    {
        // Get the long Url from the database using the short URL
        var longUrl = await _urlShortenerDb.GetLongUrlByShortUrlCode(shortUrlCode, default);

        if (string.IsNullOrWhiteSpace(longUrl))
        {
            throw new LongUrlNotFoundException($"{shortUrlCode}: A long url for the provided short url does not exist.");
        }

        return new LongUrlOutput(longUrl);
    }
}
