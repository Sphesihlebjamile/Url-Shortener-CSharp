namespace Backend.Infrastructure.Orchestrators;

public sealed class LongUrlOrchestrator :
    ILongUrlOrchestrator
{
    ILongUrlPlan _longUrlPlan;

    public LongUrlOrchestrator(ILongUrlPlan longUrlPlan)
    {
        _longUrlPlan = longUrlPlan;
    }

    public async Task<LongUrlOutput> ExecuteAsync(string longUrl)
    {
        return await _longUrlPlan.ExecuteAsync(longUrl);
    }
}
