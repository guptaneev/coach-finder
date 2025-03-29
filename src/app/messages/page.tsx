"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send } from "lucide-react";
import { useMessages } from "@/hooks/use-messages";
import { formatDistanceToNow } from "date-fns";

// Mock data for initial development
const conversations = [
  {
    id: 1,
    name: "John Smith",
    lastMessage: "Hey, I would love to work with you!",
    timestamp: "2h ago",
    unread: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    lastMessage: "Thanks for your help!",
    timestamp: "1d ago",
    unread: false,
  },
];

const messages = [
  {
    id: 1,
    sender: "John Smith",
    content: "Hey, I would love to work with you!",
    timestamp: "2h ago",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Hi John! Thanks for reaching out. What are your goals?",
    timestamp: "1h ago",
    isMe: true,
  },
];

export default function Messages() {
  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState("");
  const {
    conversations,
    messages,
    selectedConversation,
    setSelectedConversation,
    sendMessage,
  } = useMessages();

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    sendMessage({
      receiverId: selectedConversation,
      content: newMessage.trim(),
    });
    setNewMessage("");
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Please sign in to continue</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="h-[calc(100vh-8rem)]">
        <CardHeader className="border-b">
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
            {/* Conversations List */}
            <div className="col-span-4 border-r">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {conversations.map((conversation) => (
                    <Button
                      key={conversation.id}
                      variant={
                        selectedConversation === conversation.id
                          ? "secondary"
                          : "ghost"
                      }
                      className="w-full justify-start gap-2"
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{conversation.name}</span>
                        <span className="text-sm text-gray-500">
                          {conversation.lastMessage}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="col-span-8 flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold">
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.name
                  }
                </h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === session.user.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === session.user.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
