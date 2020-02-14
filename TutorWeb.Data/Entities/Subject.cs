using System;
using System.ComponentModel.DataAnnotations.Schema;
using TutorWeb.Data.Interfaces;
using TutorWeb.Infrastructure.ShareKernel;

namespace TutorWeb.Data.Entities
{
    [Table("Subjects")]
    public class Subject : DomainEntity<int>, IDateTracking
    {
        public Subject()
        {
        }

        public Subject(int id, string code, string name, DateTime dateCreated, DateTime dateModified)
        {
            Id = id;
            Code = code;
            Name = name;
            DateCreated = dateCreated;
            DateModified = dateModified;
        }

        public string Name { get; set; }

        public string Code { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}