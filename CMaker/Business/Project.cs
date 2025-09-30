namespace CMaker.Business;

public partial record Project(OptionsData Options)
{
    public ImmutableList<OptionData>? Opt => Options.Options;
}
