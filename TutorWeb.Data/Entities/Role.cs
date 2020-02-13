using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TutorWeb.Data.Entities
{
    [Table("Roles")]
    public class Role : IdentityRole<Guid>
    {
        public Role() : base()
        {
        }

        public Role(string name, string description) : base(name)
        {
            this.Description = description;
        }

        [StringLength(255)]
        public string Description { get; set; }
    }
}