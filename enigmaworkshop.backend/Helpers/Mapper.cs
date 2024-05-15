using enigmaworkshop.backend.Models;
using Newtonsoft.Json;

public class Mapper
{
    public static Customer Customer(CustomerDTO dto, User user)
    {
        return new Customer
        {
            Id = Guid.NewGuid().ToString(),
            User = user.Id,
            FirstName = dto.FirstName!,
            LastName = dto.LastName!,
            Gender = dto.Gender!,
            DoB = DateOnly.FromDateTime(dto.DoB ?? DateTime.Now),
            Email = dto.Email!,
            Phone = dto.Phone!,
            Address = JsonConvert.SerializeObject(dto.Address) ?? "",
            CreatedAt = DateTime.Now,
        };
    }

    public static Employee Employee(EmployeeDTO dto, User user)
    {
        return new Employee
        {
            Id = Guid.NewGuid().ToString(),
            User = user.Id,
            FirstName = dto.FirstName!,
            LastName = dto.LastName!,
            Gender = dto.Gender!,
            DoB = DateOnly.FromDateTime(dto.DoB),
            Email = dto.Email!,
            Phone = dto.Phone!,
            Address = JsonConvert.SerializeObject(dto.Address) ?? "",
            OptIn = DateOnly.FromDateTime(dto.OptIn ?? DateTime.Now),
            CreatedAt = DateTime.Now,
        };
    }
    // public static Product Product(ProductDTO dto){

    //     return new Product {
    //         Id = dto.Id
    //     };
    // }
}
