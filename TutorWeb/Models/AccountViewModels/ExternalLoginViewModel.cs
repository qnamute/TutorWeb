using System.ComponentModel.DataAnnotations;

namespace TutorWeb.Models.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FullName { get; set; }
    }
}