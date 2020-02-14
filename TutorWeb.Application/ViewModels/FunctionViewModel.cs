using System.ComponentModel.DataAnnotations;

namespace TutorWeb.Application.ViewModels
{
    public class FunctionViewModel
    {
        public int Id { get; set; }
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [Required]
        [StringLength(250)]
        public string URL { get; set; }

        public int ParentId { get; set; }

        public string IconCss { get; set; }
        public int SortOrder { get; set; }
    }
}