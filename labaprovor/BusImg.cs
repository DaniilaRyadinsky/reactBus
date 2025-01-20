namespace labaprovor
{
    public class BusImg
    {
        public Guid Id { get; set; }
        public Guid BusId { get; set; }
        public virtual Bus Bus { get; set; }
        public string Image { get; set; } = "";
    }
}
