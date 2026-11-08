CREATE PROCEDURE [dbo].[GetLongUrlByShortUrlCode]
	@ShortUrl NVARCHAR(7)
AS
BEGIN
	SET NOCOUNT ON;

	-- Returns a LongUrl for the provided short url
	SELECT
		TOP(1) [LongUrl]
	FROM [dbo].[Urls]
	WHERE [ShortUrlCode] = @ShortUrl
END