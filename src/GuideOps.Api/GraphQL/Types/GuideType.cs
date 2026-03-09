using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Types;

public class GuideType : ObjectType<Guide>
{
    protected override void Configure(IObjectTypeDescriptor<Guide> descriptor)
    {
        descriptor.Field(g => g.Steps).UseSorting();
        descriptor.Field(g => g.Completions).UseFiltering().UseSorting();
        descriptor.Field(g => g.Assignments).UseFiltering();
    }
}
