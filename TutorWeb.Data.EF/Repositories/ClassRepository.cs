using TutorWeb.Data.Entities;
using TutorWeb.Data.IRepositories;

namespace TutorWeb.Data.EF.Repositories
{
    public class ClassRepository : Repository<Class, int>, IClassRepository
    {
        public ClassRepository(AppDbContext context) : base(context)
        {
        }
    }
}