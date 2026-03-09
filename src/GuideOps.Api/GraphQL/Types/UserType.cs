using GuideOps.Api.Models;

namespace GuideOps.Api.GraphQL.Types;

public class UserType : ObjectType<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.Field(u => u.Acknowledgments).UseFiltering().UseSorting();
        descriptor.Field(u => u.GuideCompletions).UseFiltering().UseSorting();
    }
}
