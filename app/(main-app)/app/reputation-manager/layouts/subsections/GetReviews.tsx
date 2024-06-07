import Motion from "@/components/Motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CreateTemplateDialog from "./components/dialogs/CreateTemplateDialog";

export default function GetReviewsSection() {
  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <h1 className="text-[28px] font-semibold">Get started here</h1>
      <div className="mt-10">
        <div>
          <h1 className="text-xl font-semibold">Choose your template</h1>
          <p className="mt-2">
            Select the template you want to use for this campaign. You can select the existing template, edit an existing template or create a new template.
          </p>
          <h2 className="text-xl font-semibold text-primary-green mt-6">Use an existing template</h2>
          <div className="flex gap-6 mt-4">
            <Select>
              <SelectTrigger className="w-full max-w-[583px]">
                <SelectValue placeholder="Business category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full max-w-[152px] border border-primary-green bg-white text-primary-green pl-1 text-[16px]">
                <SelectValue placeholder="Business category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
            <CreateTemplateDialog />
          </div>
        </div>
        <div className="mt-8 space-y-5">
          <h1 className="text-xl font-semibold">Select review sites</h1>
          <p className="!mt-3">Select which review sites you want to direct people to leave reviews on. </p>
          <button className="bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap">
            Change
          </button>
        </div>
        <div className="mt-8 space-y-5">
          <h1 className="text-xl font-semibold">Choose when you are notified of feedback by email</h1>
          <p className="!mt-3">Select which review sites you want to direct people to leave reviews on. </p>
          <button className="bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap">
            Set email notifications
          </button>
        </div>
        <div className="mt-8 space-y-5">
          <h1 className="text-xl font-semibold">Choose your request method</h1>
          <p className="!mt-3">
            Use “send campaign” if you’d like to import contacts and send them review via email or SMS. Use ‘Get request URLs’ If you’d like to get a review
            request URL for use in in-store kiosks, online sharing, or somewhere else.{" "}
          </p>
          <div className="flex gap-4">
            <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap">
              Email campaign
            </button>
            <button className="bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap">
              SMS campaign
            </button>
          </div>
        </div>
      </div>
    </Motion>
  );
}
