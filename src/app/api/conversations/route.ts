import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversations = await prisma.message.findMany({
      where: {
        OR: [{ senderId: session.user.id }, { receiverId: session.user.id }],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      distinct: ["senderId", "receiverId"],
    });

    // Transform the data to get unique conversations
    const uniqueConversations = conversations.reduce((acc: any[], curr) => {
      const otherUser =
        curr.senderId === session.user.id ? curr.receiver : curr.sender;
      if (!acc.find((c) => c.id === otherUser.id)) {
        acc.push({
          id: otherUser.id,
          name: otherUser.name,
          image: otherUser.image,
          lastMessage: curr.content,
          timestamp: curr.createdAt,
          unread: curr.receiverId === session.user.id && !curr.read,
        });
      }
      return acc;
    }, []);

    return NextResponse.json(uniqueConversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
