import type { SVGProps } from 'react'

type IconName = 'leaf' | 'arrow' | 'search' | 'close' | 'menu' | 'chevron' | 'flock' | 'pharmacy' | 'feed' | 'herd' | 'message' | 'check' | 'top' | 'spark' | 'mail'

const paths: Record<IconName, React.ReactNode> = {
  leaf: <><path d="M20.4 3.7c-7 .1-13.8 2.7-15.2 8.1-.8 3.1 1.2 5.8 4.3 5.8 5.5 0 9.8-7.4 10.9-13.9Z" /><path d="M3.6 21c2.2-5.1 6-8.9 11.3-11.9" /><path d="M12.5 7.9c1.2 1.1 1.8 2.5 1.8 4.1" /></>,
  arrow: <><path d="M4.5 12h15" /><path d="m13.5 5 7 7-7 7" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  flock: <><path d="M6 14.5c-1.3 0-2.3-.9-2.3-2.1s1-2.1 2.3-2.1c.6 0 1.2.2 1.6.6.7-2.6 3-4.4 5.9-4.4 3.4 0 6 2.4 6 5.5 0 1.7-.8 3.2-2.1 4.2" /><path d="M10 15.7c0-1.5 1.1-2.7 2.5-2.7s2.5 1.2 2.5 2.7-1.1 2.7-2.5 2.7-2.5-1.2-2.5-2.7ZM5 18l-1.5 2M19 17l1.5 2M13 3.5v2" /></>,
  pharmacy: <><path d="M4 20h16M6 20V8.5L12 5l6 3.5V20M10 11h4M12 9v4M9 20v-4h6v4" /></>,
  feed: <><path d="M4 18.5 7.5 9h9l3.5 9.5H4Z" /><path d="M7.5 9 10 5h4l2.5 4M9 13h.01M12 13h.01M15 13h.01M9 16h.01M12 16h.01M15 16h.01" /></>,
  herd: <><path d="M5 18.5c0-3.3 2.8-5.5 7-5.5s7 2.2 7 5.5" /><circle cx="12" cy="7.5" r="3.5" /><path d="m8 6-2-2M16 6l2-2" /></>,
  message: <><path d="M20 11.4a7.8 7.8 0 0 1-8 7.6 8.5 8.5 0 0 1-3.5-.8L4 20l1.3-3.3A7.2 7.2 0 0 1 4 12c0-4.2 3.6-7.6 8-7.6s8 3.2 8 7Z" /><path d="M8 11.7h8M8 14.7h5" /></>,
  check: <path d="m5 12 4.2 4.2L19.5 6" />,
  top: <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
  mail: <><rect x="3.5" y="5" width="17" height="14" rx="1.5" /><path d="m4.5 7 7.5 5.7L19.5 7" /></>,
}

export function Icon({ name, size = 20, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false" {...props}>{paths[name]}</svg>
}
