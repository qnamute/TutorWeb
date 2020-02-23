using System;
using System.Collections.Generic;
using System.Text;

namespace TutorWeb.Application.ViewModels
{
    public class ClassViewModel
    {
        public int Id { get; set; }

        public string Level { get; set; }

        public int SubjectId { get; set; }

        public string Address { get; set; }

        public decimal Salary { get; set; }

        public int NumberOfSessions { get; set; }

        public string TeachingTime { get; set; }

        public string Request { get; set; }

        public string ContactInfo { get; set; }

        public virtual SubjectViewModel Subject { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}
