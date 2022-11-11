using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using twaijri.Models;

namespace twaijri.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  
    public class InvoicesController : ControllerBase
    {
        private readonly twaijrDbContext _context;

        public InvoicesController(twaijrDbContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.Include(c => c.Customer).ToListAsync();
        }
         [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoiceById(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }


        // POST: api/Invoices
        [HttpPost]
        public async Task<ActionResult<Invoice>> AddInvoice(Invoice invoicenew)
        {
            
            

            Invoice invoice = new Invoice
            {
                Value = invoicenew.Value,
                InvoiceDate = invoicenew.InvoiceDate,
                CustomerId = invoicenew.CustomerId,
                State = invoicenew.State,
            };
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(invoice);
        }
        // PUT: api/Invoices/5

        [HttpPut("{id}")]
        public async Task<IActionResult> EditInvoice(int id, Invoice invoiceNew)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return BadRequest("Not Found");
            }
            invoice.Value = invoiceNew.Value;
            invoice.InvoiceDate = invoiceNew.InvoiceDate;
            invoice.State = invoiceNew.State;
            invoice.CustomerId = invoiceNew.CustomerId;
            _context.Invoices.Update(invoice);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(200);
        }
        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.InvoiceId == id);
        }
        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return Ok(200);
        }
    }
}
