namespace CMaker.Business;

public class CMakeServiceMock : ICMakeService
{
    private readonly Project _options;

    public CMakeServiceMock(ISerializer serializer)
    {
        _options = serializer.FromString<Project>(CMakeMockData.BusinessProjectJson)!;
    }

    public Task<Project> GetProject()
    {
        return Task.FromResult(_options);
    }
}