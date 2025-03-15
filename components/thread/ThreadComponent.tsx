"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  PlusCircle,
  ThumbsUp,
  Clock,
  User,
  Reply,
  BookOpen,
  X,
  Tag,
  PenLine,
  Heart as HeartIcon,
  MessageCircle,
  SendHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AIAssistant } from "./AIAssistant";

// Define thread interface
interface Thread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  course: string;
  timestamp: Date;
  likes: number;
  replies: Reply[];
  tags: string[];
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  likes: number;
}

// Mock data for initial threads
const initialThreads: Thread[] = [
  {
    id: "1",
    title: "Understanding Neural Network Activation Functions",
    content:
      "I'm struggling with the concept of activation functions in neural networks. Can someone explain when to use ReLU vs Sigmoid?",
    author: {
      name: "Alex Chen",
      avatar: "/avatars/alex.png",
    },
    course: "Machine Learning Fundamentals",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    likes: 12,
    tags: ["Neural Networks", "Activation Functions", "ML"],
    replies: [
      {
        id: "r1",
        content:
          "ReLU is generally preferred in hidden layers because it doesn't suffer from the vanishing gradient problem. Sigmoid is typically used in output layers for binary classification.",
        author: {
          name: "Maya Johnson",
          avatar: "/avatars/maya.png",
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        likes: 8,
      },
      {
        id: "r2",
        content:
          "Great explanation Maya! I'd add that ReLU is computationally more efficient too, which is why it's become so popular in deep networks.",
        author: {
          name: "David Kumar",
          avatar: "/avatars/david.png",
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        likes: 5,
      },
    ],
  },
  {
    id: "2",
    title: "Resources for Advanced CSS Grid Layouts",
    content:
      "I've completed the 'CSS Grid Fundamentals' module, but I'd love to find more advanced examples and exercises. Does anyone have recommendations?",
    author: {
      name: "Sarah Williams",
      avatar: "/avatars/sarah.png",
    },
    course: "Modern Web Development",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    likes: 7,
    tags: ["CSS Grid", "Web Dev", "Resources"],
    replies: [
      {
        id: "r3",
        content:
          "CSS-Tricks has an amazing guide on advanced grid techniques: https://css-tricks.com/snippets/css/complete-guide-grid/",
        author: {
          name: "Jason Lee",
          avatar: "/avatars/jason.png",
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
        likes: 4,
      },
    ],
  },
];

export function ThreadComponent() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [newThreadTags, setNewThreadTags] = useState("");
  const [newReplyContent, setNewReplyContent] = useState<{
    [key: string]: string;
  }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Create a new thread
  const handleCreateThread = () => {
    if (newThreadTitle.trim() === "" || newThreadContent.trim() === "") return;

    const tagsArray = newThreadTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const newThread: Thread = {
      id: Date.now().toString(),
      title: newThreadTitle,
      content: newThreadContent,
      author: {
        name: "Current User", // Would come from auth in a real app
        avatar: "/avatars/user.png",
      },
      course: "Current Course", // Would be dynamic in a real app
      timestamp: new Date(),
      likes: 0,
      tags: tagsArray,
      replies: [],
    };

    setThreads([newThread, ...threads]);
    setNewThreadTitle("");
    setNewThreadContent("");
    setNewThreadTags("");
  };

  // Create a new reply
  const handleAddReply = (threadId: string) => {
    const content = newReplyContent[threadId];
    if (!content || content.trim() === "") return;

    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        const newReply: Reply = {
          id: `r${Date.now()}`,
          content: content,
          author: {
            name: "Current User", // Would come from auth in a real app
            avatar: "/avatars/user.png",
          },
          timestamp: new Date(),
          likes: 0,
        };

        return {
          ...thread,
          replies: [...thread.replies, newReply],
        };
      }
      return thread;
    });

    setThreads(updatedThreads);

    // Reset the reply content for this thread
    setNewReplyContent({
      ...newReplyContent,
      [threadId]: "",
    });

    setReplyingTo(null);
  };

  // Like a thread
  const handleLikeThread = (threadId: string) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          likes: thread.likes + 1,
        };
      }
      return thread;
    });

    setThreads(updatedThreads);
  };

  // Like a reply
  const handleLikeReply = (threadId: string, replyId: string) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        const updatedReplies = thread.replies.map((reply) => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1,
            };
          }
          return reply;
        });

        return {
          ...thread,
          replies: updatedReplies,
        };
      }
      return thread;
    });

    setThreads(updatedThreads);
  };

  // Format date to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Filter threads based on search and tags
  const filteredThreads = threads.filter((thread) => {
    const matchesSearch =
      searchQuery === "" ||
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      activeTag === null ||
      thread.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  // Get all unique tags from threads
  const allTags = Array.from(new Set(threads.flatMap((thread) => thread.tags))).sort();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-6 rounded-xl shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 flex items-center">
            <MessageSquare className="h-7 w-7 mr-3 text-purple-600 dark:text-purple-400" />
            Discussion Threads
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Ask questions, share insights, and connect with other learners
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 border-slate-300 dark:border-slate-700 focus-visible:ring-purple-500 shadow-sm"
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md transition-all duration-300 hover:shadow-lg">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Thread
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle className="text-xl text-center sm:text-left bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                  Create a New Discussion Thread
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="thread-title" className="text-sm font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Thread Title
                  </label>
                  <Input
                    id="thread-title"
                    placeholder="E.g., Understanding Neural Network Activation Functions"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                    className="border-slate-300 dark:border-slate-700 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="thread-content" className="text-sm font-medium flex items-center">
                    <PenLine className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Content
                  </label>
                  <Textarea
                    id="thread-content"
                    placeholder="Describe your question or discussion topic..."
                    rows={5}
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                    className="border-slate-300 dark:border-slate-700 focus-visible:ring-purple-500 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="thread-tags" className="text-sm font-medium flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Tags (comma-separated)
                  </label>
                  <Input
                    id="thread-tags"
                    placeholder="E.g., Neural Networks, Activation Functions, ML"
                    value={newThreadTags}
                    onChange={(e) => setNewThreadTags(e.target.value)}
                    className="border-slate-300 dark:border-slate-700 focus-visible:ring-purple-500"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Adding relevant tags helps others find your discussion more easily
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewThreadTitle("");
                    setNewThreadContent("");
                    setNewThreadTags("");
                  }}
                  className="border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  onClick={() => {
                    handleCreateThread();
                    // Only close if the fields are valid
                    if (newThreadTitle.trim() !== "" && newThreadContent.trim() !== "") {
                      const closeButton = document.querySelector('[aria-label="Close"]');
                      if (closeButton) {
                        (closeButton as HTMLButtonElement).click();
                      }
                    }
                  }}
                  disabled={newThreadTitle.trim() === "" || newThreadContent.trim() === ""}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Post Thread
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tags filter */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-slate-800/50 py-4 px-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="text-sm text-slate-500 dark:text-slate-400 mr-2 flex items-center font-medium">
          <Tag className="h-3.5 w-3.5 mr-1.5" />
          Filter by:
        </div>
        <Badge
          variant={activeTag === null ? "default" : "outline"}
          className={`cursor-pointer ${activeTag === null ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-sm" : "hover:bg-slate-100 dark:hover:bg-slate-700"} transition-all duration-200`}
          onClick={() => setActiveTag(null)}
        >
          All Topics
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            className={`cursor-pointer ${activeTag === tag ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-sm" : "hover:bg-slate-100 dark:hover:bg-slate-700"} transition-all duration-200`}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Thread list */}
      <div className="space-y-8">
        {filteredThreads.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="bg-slate-100 dark:bg-slate-700/50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <MessageSquare className="h-12 w-12 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 mb-3">No discussions found</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              {searchQuery ? "Try different search terms or" : "Be the first to"} start a new discussion and get answers from the community!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md transition-all duration-300 hover:shadow-lg">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Thread
                </Button>
              </DialogTrigger>
              {/* Same Dialog content as above */}
            </Dialog>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <Card key={thread.id} className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group rounded-xl">
              <div className="h-1.5 bg-gradient-to-r from-purple-500/80 to-blue-500/80 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="pb-2 pt-5">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">{thread.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {thread.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-colors duration-200 border-slate-200 dark:border-slate-700"
                          onClick={() => setActiveTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 py-1.5 px-3 rounded-full">
                    <BookOpen className="h-4 w-4 mr-1.5 text-purple-500" />
                    <span>{thread.course}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border-2 border-slate-200 dark:border-slate-700 ring-2 ring-white dark:ring-slate-900">
                    <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-sm">
                      {thread.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-slate-900 dark:text-white mr-2">{thread.author.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatRelativeTime(thread.timestamp)}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line mb-4 leading-relaxed">{thread.content}</p>

                    <div className="flex gap-4 border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                      <button
                        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 flex items-center bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-full transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        onClick={() => handleLikeThread(thread.id)}
                      >
                        <HeartIcon className={`h-4 w-4 mr-1.5 ${thread.likes > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                        {thread.likes} {thread.likes === 1 ? 'Like' : 'Likes'}
                      </button>
                      <button
                        className={`text-sm font-medium ${replyingTo === thread.id ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 bg-slate-50 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/20'} flex items-center px-3 py-1.5 rounded-full transition-colors`}
                        onClick={() => setReplyingTo(replyingTo === thread.id ? null : thread.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1.5" />
                        {thread.replies.length} {thread.replies.length === 1 ? 'Reply' : 'Replies'}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Replies */}
              {thread.replies.length > 0 && (
                <div className="px-6 py-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900">
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                    <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-4 flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                      Replies ({thread.replies.length})
                    </h4>

                    <div className="space-y-6 ml-4 pl-4 border-l-2 border-l-purple-200 dark:border-l-purple-800/50">
                      {thread.replies.map((reply) => (
                        <div key={reply.id} className="bg-white dark:bg-slate-800/70 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
                              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs">
                                {reply.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="font-medium text-slate-900 dark:text-white mr-2">{reply.author.name}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatRelativeTime(reply.timestamp)}
                                </span>
                              </div>

                              <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">{reply.content}</p>

                              <button
                                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 flex items-center mt-3 group"
                                onClick={() => handleLikeReply(thread.id, reply.id)}
                              >
                                <HeartIcon className={`h-3 w-3 mr-1 group-hover:scale-110 transition-transform ${reply.likes > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                                {reply.likes} {reply.likes === 1 ? 'Like' : 'Likes'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reply form */}
              {replyingTo === thread.id && (
                <CardFooter className="border-t border-slate-200 dark:border-slate-700 pt-4 pb-4 bg-slate-50 dark:bg-slate-800/30">
                  <div className="flex items-start gap-3 w-full">
                    <Avatar className="h-8 w-8 border-2 border-slate-200 dark:border-slate-700 mt-1">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-sm">
                        U
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Write your reply..."
                        value={newReplyContent[thread.id] || ""}
                        onChange={(e) =>
                          setNewReplyContent({
                            ...newReplyContent,
                            [thread.id]: e.target.value,
                          })
                        }
                        className="w-full resize-none border-slate-300 dark:border-slate-700 focus-visible:ring-purple-500 shadow-inner"
                        rows={3}
                      />

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                          className="border-slate-300 dark:border-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-sm transition-all hover:shadow"
                          size="sm"
                          onClick={() => handleAddReply(thread.id)}
                          disabled={!newReplyContent[thread.id] || newReplyContent[thread.id].trim() === ""}
                        >
                          <SendHorizontal className="h-4 w-4 mr-1" />
                          Post Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Pagination - only show if there are threads */}
      {filteredThreads.length > 0 && (
        <div className="flex justify-center mt-10">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 flex items-center justify-center rounded-full" disabled={true}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 flex items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 flex items-center justify-center rounded-full" disabled={true}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
