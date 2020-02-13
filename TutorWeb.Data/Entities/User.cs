using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using TutorWeb.Data.Interfaces;

namespace TutorWeb.Data.Entities
{
    [Table("Users")]
    public class User : IdentityUser<Guid>, IDateTracking
    {
        [StringLength(255)]
        public string FullName { get; set; }

        [StringLength(255)]
        public string Gender { get; set; }

        [StringLength(255)]
        public string UserEmail { get; set; }

        public DateTime? BirthDay { get; set; }

        public string Avatar { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}
