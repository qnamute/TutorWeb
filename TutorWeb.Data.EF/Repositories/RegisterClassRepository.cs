using TutorWeb.Data.Entities;
using TutorWeb.Data.IRepositories;

namespace TutorWeb.Data.EF.Repositories
{
    public class RegisterClassRepository : Repository<RegisterClass, int>, IRegisterClassRepository
    {
        public RegisterClassRepository(AppDbContext context) : base(context)
        {
        }
    }
}