namespace labaprovor
{
    public class BusParams
    {
        public Guid Id { get; set; }
        public Guid BusId { get; set; }
        public virtual Bus? Bus { get; set; }

        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public List<string> Services { get; set; } = [];
        public string Сapacity { get; set; } = "";
        public string Consumption { get; set; } = "";
        public string Speed { get; set; } = "";


        public string Category { get; set; } = "";
        public string Price { get; set; } = "";
    }
}
