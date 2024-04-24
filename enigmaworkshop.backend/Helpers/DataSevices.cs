
using enigmaworkshop.backend.Models;

public class DataSevices
{
    private readonly EnigmaWorkshopContext _db;

    public DataSevices(EnigmaWorkshopContext db)
    {
        _db = db;
    }

    // Dynamic EFCore get all
    public IQueryable<T> GetAll<T>() where T : class => _db.Set<T>();
    // Dynamic EFCore get first 100
    public IQueryable<T> GetFirst100<T>() where T : class => _db.Set<T>().Take(100);
    // Dynamic EFCore get by id
    public T? GetById<T>(string Id) where T : class => _db.Set<T>().Find(Id);
    // Get User by Username
    public NgDung? GetUserByUsername(string tenNgDung) => _db.NgDungs.FirstOrDefault(u => u.TenNgDung == tenNgDung);
    // Dynamic EFCore insert
    public void Insert<T>(T entity) where T : class => _db.Set<T>().Add(entity);
    // Dynamic EFCore update
    public void Update<T>(T entity) where T : class => _db.Set<T>().Update(entity);
    // Dynamic EFCore delete
    public void Delete<T>(T entity) where T : class => _db.Set<T>().Remove(entity);
    // Dynamic EFCore save changes
    public int SaveChanges() => _db.SaveChanges();
}