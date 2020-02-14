using TutorWeb.Data.Entities;
using TutorWeb.Infrastructure.Interfaces;

namespace TutorWeb.Data.IRepositories
{
    public interface ISubjectRepository : IRepository<Subject, int>
    {
    }
}