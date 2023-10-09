namespace Alset.Api.Requests
{
    public class JournalRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int JournalistId { get; set; }

        public string? Pdf { get; set; }

    }
}
