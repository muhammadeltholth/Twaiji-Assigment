using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace twaijri.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int PhoneNumber { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
