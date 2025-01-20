namespace labaprovor
{
    public class Bus
    {
        public Guid Id { get; set; }
        public virtual BusImg Image { get; set; }
        public virtual BusParams Params { get; set; }
        public virtual List<User> Customers { get; set; } = [];
    }
}
