using System;
using System.ComponentModel.DataAnnotations.Schema;
using TutorWeb.Data.Interfaces;
using TutorWeb.Infrastructure.ShareKernel;

namespace TutorWeb.Data.Entities
{
    [Table("RegisterClasses")]
    public class RegisterClass : DomainEntity<int>, IDateTracking
    {
        public RegisterClass()
        {
        }

        public RegisterClass(int classId, Guid userId, DateTime dateCreated, DateTime dateModified)
        {
            ClassId = classId;
            UserId = userId;
            DateCreated = dateCreated;
            DateModified = dateModified;
        }

        public int ClassId { get; set; }

        public Guid UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}