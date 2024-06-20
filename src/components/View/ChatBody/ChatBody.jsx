import ChatHeader from "../ChatHeader";
import ChatFooter from "../ChatFooter";
import DetailMessage from "./DetailMessage/DetailMessage";

function ChatBody() {
  let message = [
    {
      id: 1,
      message: "Hey, how's your day going?",
      time: "",
    },
    {
      id: 2,
      message: "Not too bad, just a bit busy. How about you?",
      time: "",
    },
    {
      id: 1,
      message: "I'm good, thanks. Anything exciting happening?",
      time: "",
    },
    {
      id: 2,
      message: "I'm good, thanks. Anything exciting happening?",
      time: "",
    },
    {
      id: 1,
      message: "Not really, just the usual. Work and errands.",
      time: "",
    },
    {
      id: 2,
      message: "Sounds like a typical day. Got any plans for the weekend?",
      time: "",
    },
    {
      id: 1,
      message: "Not yet, I'm hoping to relax and maybe catch up on some reading. How about you?",
      time: "",
    },
    {
      id: 2,
      message: "I might go hiking if the weather's nice. Otherwise, just taking it easy",
      time: "",
    },
    {
      id: 1,
      message: "Hiking sounds fun. Hope the weather cooperates for you!",
      time: "",
    },
    {
      id: 2,
      message: "You too, take care!",
      time: "",
    },
    {
      id: 1,
      message: " Sure",
      time: "",
    },
    {
      id: 2,
      message: "Thanks",
      time: "",
    },
  ];
  return (
    <div className="flex flex-col h-screen mx-2 w-full">
      <ChatHeader />
      <div className="flex flex-grow flex-col space-y-2 overflow-y-auto no-scrollbar">
        {/* <!-- Messages go here -->
                <!-- Example Message --> */}
        <DetailMessage inforMessage={message} />
      </div>
      <ChatFooter />
    </div>
  );
}

export default ChatBody;
