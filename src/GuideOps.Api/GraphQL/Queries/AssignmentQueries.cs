using GuideOps.Api.Data;
using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Queries;

public partial class QueryType
{
    [UsePaging]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Assignment> GetAssignments(GuideOpsDbContext context)
    => context.Assignments;
}
