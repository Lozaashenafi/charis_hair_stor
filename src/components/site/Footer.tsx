import Image from 'next/image';

const paymentIcons = [
  'visa', 'mastercard', 'amex', 'paypal', 'applepay', 'googlepay' // filenames for your icons
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white px-6 py-12 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Newsletter Signup */}
        <div>
          <h4 className="text-sm uppercase tracking-wider mb-2">Subscribe to our emails</h4>
          <form className="flex max-w-md border border-gray-700">
            <input 
              type="email" 
              placeholder="Email" 
              className="flex-grow bg-transparent p-3 text-sm focus:outline-none"
            />
            <button type="submit" className="px-4 border-l border-gray-700">
              <Image src="/icons/arrow-right.svg" alt="Submit" width={16} height={16} />
            </button>
          </form>
        </div>

        {/* Region & Payment Icons */}
        <div className="flex flex-col items-end gap-6 text-xs text-gray-400">
          <div className="border border-gray-700 p-2 min-w-40 flex justify-between items-center">
             <span>Poland | PLN zł</span>
             <span>&#9662;</span>
          </div>
          <div className="flex gap-2">
            {paymentIcons.map(icon => (
              <Image key={icon} src={`/icons/payment/${icon}.svg`} alt={icon} width={40} height={25} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}