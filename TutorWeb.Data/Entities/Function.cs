using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TutorWeb.Infrastructure.ShareKernel;

namespace TutorWeb.Data.Entities
{
    [Table("Functions")]
    public class Function : DomainEntity<int>
    {
        public Function()
        {
        }

        public Function(int id, string name, string url, int parentId, string iconCss, int sortOrder)
        {
            this.Id = id;
            this.Name = name;
            this.URL = url;
            this.ParentId = parentId;
            this.IconCss = iconCss;
            this.SortOrder = sortOrder;
        }

        public Function(string name, string url, int parentId, string iconCss, int sortOrder)
        {
            this.Name = name;
            this.URL = url;
            this.ParentId = parentId;
            this.IconCss = iconCss;
            this.SortOrder = sortOrder;
        }

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