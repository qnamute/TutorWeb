using System;
using System.ComponentModel.DataAnnotations.Schema;
using TutorWeb.Data.Interfaces;
using TutorWeb.Infrastructure.ShareKernel;

namespace TutorWeb.Data.Entities
{
    [Table("Subjects")]
    public class Subject : DomainEntity<int>, IDateTracking
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}