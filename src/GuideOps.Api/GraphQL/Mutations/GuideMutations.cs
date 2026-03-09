using GuideOps.Api.Data;
using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.GraphQL.Mutations;

public partial class MutationType
{
    public async Task<Guide> CreateGuide(GuideOpsDbContext context, CreateGuideInput input)
    {
        var guide = new Guide
        {
            Title = input.Title,
            Description = input.Description,
            Type = input.Type,
            SchoolYear = input.SchoolYear,
            Priority = input.Priority,
            IsActive = input.IsActive,
            CreatedBy = input.CreatedBy
        };

        context.Guides.Add(guide);
        await context.SaveChangesAsync();
        return guide;
    }

    public async Task<Guide?> UpdateGuide(GuideOpsDbContext context, int id, UpdateGuideInput input)
    {
        var guide = await context.Guides.FindAsync(id);
        if (guide is null) return null;

        if (input.Title is not null) guide.Title = input.Title;
        if (input.Description is not null) guide.Description = input.Description;
        if (input.Type is not null) guide.Type = input.Type;
        if (input.SchoolYear is not null) guide.SchoolYear = input.SchoolYear;
        if (input.Priority.HasValue) guide.Priority = input.Priority.Value;
        if (input.IsActive.HasValue) guide.IsActive = input.IsActive.Value;
        guide.UpdatedAt = DateTime.UtcNow;

        await context.SaveChangesAsync();
        return guide;
    }

    public async Task<bool> DeleteGuide(GuideOpsDbContext context, int id)
    {
        var guide = await context.Guides.FindAsync(id);
        if (guide is null) return false;

        context.Guides.Remove(guide);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<Guide?> SetGuideSteps(
        GuideOpsDbContext context,
        int guideId,
        List<GuideStepInput> steps)
    {
        var guide = await context.Guides
            .Include(g => g.Steps)
            .FirstOrDefaultAsync(g => g.Id == guideId);

        if (guide is null) return null;

        // Remove existing steps
        context.GuideSteps.RemoveRange(guide.Steps);

        // Add new steps
        for (var i = 0; i < steps.Count; i++)
        {
            guide.Steps.Add(new GuideStep
            {
                GuideId = guideId,
                StepOrder = i + 1,
                ElementSelector = steps[i].ElementSelector,
                Title = steps[i].Title,
                Description = steps[i].Description,
                Side = steps[i].Side,
                PageUrl = steps[i].PageUrl
            });
        }

        guide.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return await context.Guides
            .Include(g => g.Steps.OrderBy(s => s.StepOrder))
            .FirstOrDefaultAsync(g => g.Id == guideId);
    }
}

public record CreateGuideInput(
    string Title,
    string Description,
    string Type,
    string SchoolYear,
    int Priority,
    bool IsActive,
    string CreatedBy);

public record UpdateGuideInput(
    string? Title,
    string? Description,
    string? Type,
    string? SchoolYear,
    int? Priority,
    bool? IsActive);

public record GuideStepInput(
    string ElementSelector,
    string Title,
    string Description,
    string Side,
    string? PageUrl);
