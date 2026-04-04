import { getAdminMessages } from "@/services/message.service";
import MessageListClient from "@/components/admin/MessageListClient";

export default async function AdminMessagesPage() {
  const allMessages = await getAdminMessages();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-0">
      <div className="pt-6">
        <h1 className="font-serif text-5xl md:text-7xl text-[#3d342a] italic lowercase tracking-tighter">
          Inquiries.
        </h1>
        <p className="text-[#8b6545] text-[10px] uppercase tracking-[0.5em] mt-4 font-bold border-l-2 border-[#d4a574] pl-4">
          Customer Feedback & Messages
        </p>
      </div>

      <MessageListClient initialMessages={allMessages} />
    </div>
  );
}