using GuideOps.Api.Data;
using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Mutations;

[MutationType]
public static class HandbookMutations
{
    public static async Task<Handbook> CreateHandbook(GuideOpsDbContext context, CreateHandbookInput input)
    {
        var handbook = new Handbook
        {
            Title = input.Title,
            ContentUrl = input.ContentUrl,
            ContentHtml = input.ContentHtml,
            SchoolYear = input.SchoolYear,
            IsActive = input.IsActive,
            RequiresAcknowledgment = input.RequiresAcknowledgment
        };

        context.Handbooks.Add(handbook);
        await context.SaveChangesAsync();
        return handbook;
    }

    public static async Task<Handbook?> UpdateHandbook(GuideOpsDbContext context, int id, UpdateHandbookInput input)
    {
        var handbook = await context.Handbooks.FindAsync(id);
        if (handbook is null) return null;

        if (input.Title is not null) handbook.Title = input.Title;
        if (input.ContentUrl is not null) handbook.ContentUrl = input.ContentUrl;
        if (input.ContentHtml is not null) handbook.ContentHtml = input.ContentHtml;
        if (input.SchoolYear is not null) handbook.SchoolYear = input.SchoolYear;
        if (input.IsActive.HasValue) handbook.IsActive = input.IsActive.Value;
        if (input.RequiresAcknowledgment.HasValue) handbook.RequiresAcknowledgment = input.RequiresAcknowledgment.Value;
        handbook.UpdatedAt = DateTime.UtcNow;

        await context.SaveChangesAsync();
        return handbook;
    }

    public static async Task<bool> DeleteHandbook(GuideOpsDbContext context, int id)
    {
        var handbook = await context.Handbooks.FindAsync(id);
        if (handbook is null) return false;

        context.Handbooks.Remove(handbook);
        await context.SaveChangesAsync();
        return true;
    }
}

public record CreateHandbookInput(
    string Title,
    string? ContentUrl,
    string? ContentHtml,
    string SchoolYear,
    bool IsActive,
    bool RequiresAcknowledgment);

public record UpdateHandbookInput(
    string? Title,
    string? ContentUrl,
    string? ContentHtml,
    string? SchoolYear,
    bool? IsActive,
    bool? RequiresAcknowledgment);
