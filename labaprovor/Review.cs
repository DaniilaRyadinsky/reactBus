namespace labaprovor
{
    public class Review
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = "";
        public string Name { get; set; } = "";
        public string Theme { get; set; } = "";
        public string Message { get; set; } = "";
    }
}
