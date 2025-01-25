using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace labaprovor
{
    [ApiController]
    [Route("[controller]")]
    public class BusController(ClassContext classContext) : ControllerBase
    {
        public ClassContext ClassContext { get; set; } = classContext;

        [HttpGet("all")]
        public async Task<ActionResult<BusVIEEEEEW>> GetAll()
        {
            return Ok(ClassContext.Buses.Select(i =>
                new BusVIEEEEEW()
                {
                    Id = i.Id,
                    Title = i.Params.Title,
                    Description = i.Params.Description,
                    Consumption = i.Params.Consumption,
                    Services = i.Params.Services,
                    Speed = i.Params.Speed,
                    Сapacity = i.Params.Сapacity,
                    Image = i.Image.Image,
                    Category = i.Params.Category,
                    Price = i.Params.Price,
                })
                );
        }

        [HttpGet("allcategory")]
        public async Task<ActionResult<List<string>>> GetAllCategory()
        {
            return Ok(
                await ClassContext.Buses
                    .Select(bp => bp.Params.Category)
                    .Distinct()
                    .ToListAsync()
                );
        }

        [HttpGet("findcategory")]
        public async Task<ActionResult<List<BusVIEEEEEW>>> FindOnCategory([FromQuery] string category)
        {
            return Ok(ClassContext.Buses
                .Where(i => i.Params.Category == category)
                .Select(i =>
               new BusVIEEEEEW()
               {
                   Id = i.Id,
                   Title = i.Params.Title,
                   Description = i.Params.Description,
                   Consumption = i.Params.Consumption,
                   Services = i.Params.Services,
                   Speed = i.Params.Speed,
                   Сapacity = i.Params.Сapacity,
                   Image = i.Image.Image,
                   Category = i.Params.Category,
                   Price = i.Params.Price,
               })
               );
        }

        [HttpGet("findId")]
        public async Task<ActionResult<BusVIEEEEEW>> FindOnId([FromQuery] Guid id)
        {
            var bus = ClassContext.Buses.FirstOrDefault(u => u.Id == id);
            if (bus == null) { return BadRequest(); }

            return Ok(
                new BusVIEEEEEW()
                {
                    Id = bus.Id,
                    Title = bus.Params.Title,
                    Description = bus.Params.Description,
                    Consumption = bus.Params.Consumption,
                    Services = bus.Params.Services,
                    Speed = bus.Params.Speed,
                    Сapacity = bus.Params.Сapacity,
                    Image = bus.Image.Image,
                    Category = bus.Params.Category,
                    Price = bus.Params.Price,
                }
                );
        }


        [HttpGet("deleteorder")]
        public async Task<ActionResult> DeleteOrder([FromQuery] Guid idbus, [FromQuery] string Login)
        {
            var user = await ClassContext.Users.FirstOrDefaultAsync(u => u.Login == Login);
            var bus = await ClassContext.Buses.FirstOrDefaultAsync(u => u.Id == idbus);

            if (user == null || bus == null)
                return BadRequest();

            var userBus = await ClassContext.Set<UserBus>()
                                             .FirstOrDefaultAsync(ub => ub.UserId == user.Id && ub.BusId == bus.Id);

            if (userBus != null)
            {
                if (userBus.Quantity > 1)
                {
                    userBus.Quantity--; // Уменьшаем количество
                }
                else
                {
                    // Если количество == 1, удаляем запись из промежуточной таблицы
                    ClassContext.Set<UserBus>().Remove(userBus);
                    bus.Customers.Remove(user); // Удаляем клиента из автобуса
                    user.Buses.Remove(bus); // Удаляем автобус из пользователя
                }

                await ClassContext.SaveChangesAsync();
                return Ok();

            }
            else return BadRequest();
        }

        [HttpGet("place")]
        public async Task<ActionResult> Placing([FromQuery] Guid idbus, [FromQuery] string Login)
        {
            var user = await ClassContext.Users.FirstOrDefaultAsync(u => u.Login == Login);
            var bus = await ClassContext.Buses.FirstOrDefaultAsync(u => u.Id == idbus);

            if (user == null || bus == null)
                return BadRequest();

            var userBus = await ClassContext.Set<UserBus>()
                                             .FirstOrDefaultAsync(ub => ub.UserId == user.Id && ub.BusId == bus.Id);

            if (userBus != null)
            {
                userBus.Quantity++; // Увеличиваем количество
            }
            else
            {
                // Если записи нет, создаем новую запись в промежуточной таблице
                var newUserBus = new UserBus
                {
                    UserId = user.Id,
                    BusId = bus.Id,
                    Quantity = 1 // Начальное количество
                };
                await ClassContext.Set<UserBus>().AddAsync(newUserBus);
            }

            bus.Customers.Add(user); // Добавляем клиента в автобус
            user.Buses.Add(bus); // Добавляем автобус в пользователя
            await ClassContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] BusInput _request)
        {
            var Image = new BusImg() { Id = Guid.NewGuid(), Image = _request.Image };
            var Params = new BusParams()
            {
                Id = Guid.NewGuid(),
                Title = _request.Title,
                Description = _request.Description,
                Consumption = _request.Consumption,
                Services = _request.Services,
                Speed = _request.Speed,
                Сapacity = _request.Сapacity,
                Category = _request.Category,
                Price = _request.Price,
                
            };

            var Bus = new Bus() { Id = Guid.NewGuid(), Image = Image, Params = Params };

            Params.Bus = Bus;
            Image.Bus = Bus;


            await ClassContext.Buses.AddAsync(Bus);
            await ClassContext.BusesParams.AddAsync(Params);
            await ClassContext.BusesImges.AddAsync(Image);

            await ClassContext.SaveChangesAsync();

            return Ok();
        }


        [HttpDelete("{id::guid}")]
        public async Task<ActionResult<Guid>> Delete(Guid id)
        {
            if (await ClassContext.Buses.FirstOrDefaultAsync(m => m.Id == id) == null)
                return BadRequest();

            await ClassContext.Buses.Where(m => m.Id == id).ExecuteDeleteAsync();

            return Ok();
        }

        [HttpPut("{id::guid}")]
        public async Task<ActionResult<Guid>> Update(Guid id, [FromBody] BusInput _request)
        {
            var bus = await ClassContext.Buses.FirstOrDefaultAsync(m => m.Id == id);

            if (bus is null)
                return BadRequest();


            bus.Params.Title = _request.Title;
            bus.Params.Description = _request.Description;
            bus.Params.Consumption = _request.Consumption;
            bus.Params.Services = _request.Services;
            bus.Params.Speed = _request.Speed;
            bus.Params.Сapacity = _request.Сapacity;
            bus.Image.Image = _request.Image;
            bus.Params.Category = _request.Category;
            bus.Params.Price = _request.Price;

            await ClassContext.SaveChangesAsync();

            return Ok(id);

        }
    }
}
