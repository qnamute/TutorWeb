using TutorWeb.Data.Entities;
using TutorWeb.Data.IRepositories;

namespace TutorWeb.Data.EF.Repositories
{
    public class SubjectRepository : Repository<Subject, int>, ISubjectRepository
    {
        public SubjectRepository(AppDbContext context) : base(context)
        {
        }
    }
}