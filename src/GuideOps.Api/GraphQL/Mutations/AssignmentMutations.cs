using GuideOps.Api.Data;
using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Mutations;

public partial class MutationType
{
    public async Task<Assignment> CreateAssignment(
        [Service] GuideOpsDbContext context,
        CreateAssignmentInput input)
    {
        var assignment = new Assignment
        {
            TargetType = input.TargetType,
            TargetId = input.TargetId,
            AssignToRole = input.AssignToRole,
            SchoolYear = input.SchoolYear,
            IsActive = true
        };

        context.Assignments.Add(assignment);
        await context.SaveChangesAsync();
        return assignment;
    }

    public async Task<bool> DeleteAssignment([Service] GuideOpsDbContext context, int id)
    {
        var assignment = await context.Assignments.FindAsync(id);
        if (assignment is null) return false;

        context.Assignments.Remove(assignment);
        await context.SaveChangesAsync();
        return true;
    }

    
}

public record CreateAssignmentInput(
    string TargetType,
    int TargetId,
    string AssignToRole,
    string SchoolYear);
