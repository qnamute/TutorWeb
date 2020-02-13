using System;
using System.ComponentModel.DataAnnotations.Schema;
using TutorWeb.Data.Interfaces;
using TutorWeb.Infrastructure.ShareKernel;

namespace TutorWeb.Data.Entities
{
    [Table("Classes")]
    public class Class : DomainEntity<int>, IDateTracking
    {
        public string Level { get; set; }

        public int SubjectId { get; set; }

        public int Address { get; set; }

        public decimal Salary { get; set; }

        public int NumberOfSessions { get; set; }

        public string TeachingTime { get; set; }

        public string Request { get; set; }

        public string ContactInfo { get; set; }

        public virtual Subject Subject { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}