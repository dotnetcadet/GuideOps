using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.GraphQL.Mutations;

public partial class MutationType
{
    public async Task<Acknowledgment?> RecordAcknowledgment(
        GuideOpsDbContext context,
        RecordAcknowledgmentInput input)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.AzureAdObjectId == input.AzureAdObjectId);

        if (user is null) return null;

        // Check if already acknowledged
        var existing = await context.Acknowledgments
            .FirstOrDefaultAsync(a =>
                a.UserId == user.Id
                && a.HandbookId == input.HandbookId
                && a.SchoolYear == input.SchoolYear);

        if (existing is not null) return existing;

        var acknowledgment = new Acknowledgment
        {
            UserId = user.Id,
            HandbookId = input.HandbookId,
            SchoolYear = input.SchoolYear,
            AcknowledgedAt = DateTime.UtcNow,
            IpAddress = input.IpAddress
        };

        context.Acknowledgments.Add(acknowledgment);
        await context.SaveChangesAsync();

        // Reload with navigation properties
        return await context.Acknowledgments
            .Include(a => a.User)
            .Include(a => a.Handbook)
            .FirstAsync(a => a.Id == acknowledgment.Id);
    }

    public async Task<GuideCompletion?> RecordGuideCompletion(
        GuideOpsDbContext context,
        string azureAdObjectId,
        int guideId)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.AzureAdObjectId == azureAdObjectId);

        if (user is null) return null;

        // Idempotent - return existing if already completed
        var existing = await context.GuideCompletions
            .Include(gc => gc.User)
            .Include(gc => gc.Guide)
            .FirstOrDefaultAsync(gc => gc.UserId == user.Id && gc.GuideId == guideId);

        if (existing is not null) return existing;

        var completion = new GuideCompletion
        {
            UserId = user.Id,
            GuideId = guideId,
            CompletedAt = DateTime.UtcNow
        };

        context.GuideCompletions.Add(completion);
        await context.SaveChangesAsync();

        return await context.GuideCompletions
            .Include(gc => gc.User)
            .Include(gc => gc.Guide)
            .FirstAsync(gc => gc.Id == completion.Id);
    }
}

public record RecordAcknowledgmentInput(
    string AzureAdObjectId,
    int HandbookId,
    string SchoolYear,
    string? IpAddress);
