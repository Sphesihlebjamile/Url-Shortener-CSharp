namespace Backend.Api.Configuration;

[ExcludeFromCodeCoverage]
internal static class ServiceCollectionRegistration
{
    extension(IServiceCollection services)
    {
        internal IServiceCollection AddApi()
        {
            services.AddValidation();
            services.AddApplication();

            services.AddExceptionHandler<GlobalExceptionHandler>();
            services.AddProblemDetails();

            return services;
        }

        internal IServiceCollection AddValidation()
        {
            services.AddValidatorsFromAssemblyContaining<ApiDataRequestValidator>();

            return services;
        }

        internal IServiceCollection AddApplication()
        {
            services.AddScoped(typeof(IUrlShortenerOrchestrator), typeof(UrlShortenerOrchestrator));
            services.AddScoped(typeof(ILongUrlOrchestrator), typeof(LongUrlOrchestrator));
            services.AddScoped(typeof(IUrlShortenerPlan), typeof(UrlShortenerPlan));
            services.AddScoped(typeof(ILongUrlPlan), typeof(LongUrlPlan));
            services.AddScoped<IBase62Converter, Base62Converter>();

            services.AddOptions<ShortenerSettings>()
                .BindConfiguration(ShortenerSettings.SectionName);

            return services;
        }

        internal IServiceCollection AddDomainServices(IConfiguration configuration)
        {
            var urlShortenerConnectionString = configuration.GetConnectionString(
                UrlShortenerDb.ConnectionStringName);

            if (string.IsNullOrWhiteSpace(urlShortenerConnectionString))
            {
                throw new InvalidOperationException(
                    $"ConnectionString: {UrlShortenerDb.ConnectionStringName} is required to register the UrlShortener database.");
            }

            services.AddScoped<IUrlShortenerDb>(_ => new UrlShortenerDb(urlShortenerConnectionString));

            return services;
        }
    }
}
