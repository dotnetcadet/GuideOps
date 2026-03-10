using Azure.Identity;
using GuideOps.Api.Data;
using GuideOps.Api.GraphQL.Mutations;
using GuideOps.Api.GraphQL.Queries;
using GuideOps.Api.GraphQL.Types;
using GuideOps.Api.Models;
using GuideOps.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<GraphServiceClient>(serviceProvider =>
{
    var configuration = serviceProvider
        .GetRequiredService<IConfiguration>();

    var options = new ClientSecretCredentialOptions
    {
        AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
    };

    var credentials = new ClientSecretCredential(
        configuration["AzureAd:TenantId"],
        configuration["AzureAd:ClientId"],
        configuration["AzureAd:ClientSecret"],
        options);

    return new GraphServiceClient(
        credentials,
        ["https://graph.microsoft.com/.default"]);
});

// Database
builder.Services.AddPooledDbContextFactory<GuideOpsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Azure AD Sync Service
builder.Services.AddScoped<AzureAdSyncService>();

//Azure AD Authentication
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd");

// GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<QueryType>()
    .AddMutationType<MutationType>()
    .AddType<UserType>()
    .AddType<GuideType>()
    .AddType<HandbookType>()
    .AddFiltering()
    .AddSorting()
    .AddProjections()
    .AddAuthorization()
    .RegisterDbContextFactory<GuideOpsDbContext>();

// CORS for admin app and SDK consumers
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? ["http://localhost:5173", "http://localhost:5174"])
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Auto-migrate in development
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<GuideOpsDbContext>();
    context.Database.EnsureCreated();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGraphQL();

app.Run();
