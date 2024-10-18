import AddCreditDialog from "../components/AddCreditDialog";

export default function SettingsPage() {
  return (
    <main>
      <div className="flex justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Credits</h1>
          <p className="text-primary-black text-opacity-50">
            Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
            ultricies accumsan. Nec.
          </p>
        </div>
      </div>
      <div>
        <div className="mt-10 flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-primary-black text-opacity-50">
              Credit balance
            </h2>
            <h1 className="text-4xl font-semibold">$0.00</h1>
          </div>
          <AddCreditDialog />
        </div>
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 mt-10 flex items-center gap-5">
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">Auto recharge is off</h1>
            <p className="leading-relaxed">
              When your credit balance reaches $0, your API requests will stop
              working. Enable automatic recharge to automatically keep your
              credit balance topped up.
            </p>
          </div>
          <p className="text-[#00B871] text-[17px] whitespace-nowrap hover:text-opacity-60 cursor-pointer">
            Enable auto recharge
          </p>
        </div>
      </div>
    </main>
  );
}
