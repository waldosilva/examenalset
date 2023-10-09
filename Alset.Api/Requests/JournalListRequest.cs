namespace Alset.Api.Requests
{
    public class JournalListRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<int>? subscriptions { get; set; }

    }
}
