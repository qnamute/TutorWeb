using TutorWeb.Data.Entities;
using TutorWeb.Data.IRepositories;

namespace TutorWeb.Data.EF.Repositories
{
    public class FunctionRepository : Repository<Function, int>, IFunctionRepository
    {
        public FunctionRepository(AppDbContext context) : base(context)
        {
        }
    }
}