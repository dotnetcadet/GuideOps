using GuideOps.Api.Data;
using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Queries;

public partial class QueryType
{
    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering]
    [UseSorting]
    public IQueryable<GuideAssignment> GetGuideAssignments([Service] GuideOpsDbContext context)
        => context.GuideAssignments;

    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering]
    [UseSorting]
    public IQueryable<HandbookAssignment> GetHandbookAssignments([Service] GuideOpsDbContext context)
        => context.HandbookAssignments;
}
