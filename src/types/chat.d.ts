import type {ScrollSize} from "@/types/scroll";

export type EditorContentType = 'html' | 'json' | 'text'

export interface ChatLayoutProps {
  headerContainerClass?: string;
  headerContentClass?: string;
  headerTitleClass?: string;
  headerActionsClass?: string;
  footerClass?: string;
  bodyClass?: string
  scrollable?: boolean
  scrollSize?: ScrollSize,
  autoScrollOnMount?: boolean
}