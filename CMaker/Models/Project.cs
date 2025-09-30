namespace CMaker.Models;

public record OptionData(string? Name, string? DefaultValue);

public record OptionsData(ImmutableList<OptionData>? Options);
