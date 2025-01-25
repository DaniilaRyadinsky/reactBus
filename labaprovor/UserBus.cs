namespace labaprovor
{
    public class UserBus
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        public Guid BusId { get; set; }
        public virtual Bus Bus { get; set; } 

        public int Quantity { get; set; }
    }
}
