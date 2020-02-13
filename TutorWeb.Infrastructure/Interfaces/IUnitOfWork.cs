using System;
using System.Collections.Generic;
using System.Text;

namespace TutorWeb.Infrastructure.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Call save change for dbcontext
        /// </summary>
        void Commit();
    }
}
