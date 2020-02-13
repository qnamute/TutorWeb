using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TutorWeb.Infrastructure.ShareKernel
{
    public class DomainEntity<T>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public T Id { get; set; }

        /// <summary>
        /// True if domain Entity has an identity
        /// </summary>
        /// <returns></returns>

        public bool IsTransient()
        {
            return Id.Equals(default(T));
        }
    }
}