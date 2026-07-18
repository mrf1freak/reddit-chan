"use client";

import { Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import FallbackImage from "@/components/common/FallbackImage";
import SanitizedHtml from "@/components/common/SanitizedHtml";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useRecentThreads from "@/hooks/useRecentThreads";
import { postThumbnailLink } from "@/utils/post";
import { ClearRecentThreadsButton } from "./ClearRecentThreadsButton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { threads, remove, clear } = useRecentThreads();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link
          href="/"
          prefetch={false}
          className="flex items-center justify-center text-3xl p-4 py-4 font-light md:flex-1"
        >
          <div className="flex items-center mr-2">
            <img src="/logo.png" width="32" height="32" alt="RedditChan" />
          </div>
          RedditChan
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Threads</SidebarGroupLabel>
          {threads.length > 0 && <ClearRecentThreadsButton onClear={clear} />}
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {threads.map(({ tim, com, no, board }) => (
                <SidebarMenuItem key={no}>
                  <SidebarMenuButton
                    className="h-10 text-xs"
                    render={
                      <Link href={`/${board}/thread/${no}`} prefetch={false} />
                    }
                    isActive={pathname === `/${board}/thread/${no}`}
                  >
                    {typeof tim !== "undefined" && (
                      <FallbackImage
                        src={postThumbnailLink(board, tim)}
                        className="shrink-0 size-8 object-cover"
                        alt="thread thumbnail"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <SanitizedHtml
                      html={com}
                      className="flex-1 truncate flex items-start shrink h-full"
                    />
                    <button
                      className="hidden group-hover/menu-item:flex text-destructive"
                      type="button"
                      onClick={(event) => {
                        remove(no);
                        event.preventDefault();
                      }}
                    >
                      <Trash />
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
