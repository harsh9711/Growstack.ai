import Layout from "./components/Layout";
import ShareChatDialog from "./components/ShareChatDialog";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col h-full w-full">
      <Layout />
      <ShareChatDialog />
    </div>
  );
}
  