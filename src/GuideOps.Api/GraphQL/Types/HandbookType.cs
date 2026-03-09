using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Types;

public class HandbookType : ObjectType<Handbook>
{
    protected override void Configure(IObjectTypeDescriptor<Handbook> descriptor)
    {
        descriptor.Field(h => h.Acknowledgments).UseFiltering().UseSorting();
        descriptor.Field(h => h.Assignments).UseFiltering();
    }
}
