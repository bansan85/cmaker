namespace CMaker.Business;

public interface ICMakeService
{
    Task<Project> GetProject();
}