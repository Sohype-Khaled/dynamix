import type {ScrollbarSize} from "@/types/scroll";
import type {ComponentPublicInstance} from "vue";
import DXChatBubble from "@/components/DXChat/DXChatBubble/DXChatBubble.vue";

export type EditorContentType = 'html' | 'json' | 'text'

export interface ChatLayoutProps {
  headerContainerClass?: string;
  headerContentClass?: string;
  headerTitleClass?: string;
  headerActionsClass?: string;
  footerClass?: string;
  bodyClass?: string
  scrollable?: boolean
  scrollSize?: ScrollbarSize,
  autoScrollOnMount?: boolean
}

export interface ChatFormDataPayload {
  text?: string;
  attachment?: string;
  record?: string | null;
  replyTo?: string | null
}

export interface ChatMessage {
  isSent: boolean;
  username: string;

}

export type BubbleInstance = ComponentPublicInstance<
  typeof DXChatBubble['$props'],
  typeof DXChatBubble['$emit'],
  typeof DXChatBubble['$slots']
>
