using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace twaijri.Models
{
    public class Invoice
    {
        [Key]
        public int InvoiceId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Value { get; set; }
        public int CustomerId { get; set; }
        public State State { get; set; }

        public Customer Customer { get; set; }

    }


    public enum State
    {
        Pay = 1,
        NotPay = 0
    }
}
