import AddCreditDialog from "../components/AddCreditDialog";

export default function SettingsPage() {
  return (
    <main>
      <div className="flex justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Credits</h1>
          <p className="text-primary-black text-opacity-50">Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam ultricies accumsan. Nec.</p>
        </div>
      </div>
      <div>
        <div className="mt-10 flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-primary-black text-opacity-50">Credit balance</h2>
            <h1 className="text-4xl font-semibold">$0.00</h1>
          </div>
          <AddCreditDialog />
        </div>
    
      </div>
    </main>
  );
}
