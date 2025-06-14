export interface DXMenuItemProps {
  key?: string
  label?: string | (() => string)
  icon?: string
  url?: string
  target?: string
  style?: any
  class?: string | string[] | Record<string, boolean>
  items?: DXMenuItemProps[]
  separator?: boolean
  disabled?: boolean | (() => boolean)
  visible?: boolean | (() => boolean)
  command?: (event: { originalEvent: Event; item: DXMenuItemProps }) => void
  collapsible?: boolean
  expanded?: boolean
  [key: string]: any
}
