public class Poll
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string OptionAName { get; set; }
    public string OptionAImageUrl { get; set; }
    public int OptionAVotes { get; set; }
    public string OptionBName { get; set; }
    public string OptionBImageUrl { get; set; }
    public int OptionBVotes { get; set; }
    public bool IsActive { get; set; }
}