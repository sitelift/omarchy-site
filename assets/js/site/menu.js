/* Site navigation as the Omarchy menu: nested, filterable, keyboard-first.
   Replaces the chip rows on omarchy.org — same destinations, launcher UX. */

const ICONS = {
  book: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="m0 4.5c0-.4.16-.78.44-1.06s.66-.44 1.06-.44h8.51c2.45 0 4.63 1.18 6 3 .7-.93 1.6-1.69 2.65-2.21 1.04-.52 2.19-.79 3.36-.79h8.49c.4 0 .78.16 1.06.44s.44.66.44 1.06v21c0 .4-.16.78-.44 1.06s-.66.44-1.06.44h-9.01c-.59 0-1.18.12-1.72.34-.55.23-1.04.56-1.46.98l-1.24 1.24c-.28.28-.66.44-1.06.44s-.78-.16-1.06-.44l-1.24-1.24c-.42-.42-.91-.75-1.46-.98-.55-.23-1.13-.34-1.72-.34H1.5c-.4 0-.78-.16-1.06-.44S0 25.9 0 25.5zm14.5 20.65.01-10.15V10.5c0-1.19-.48-2.34-1.32-3.18-.84-.84-1.99-1.32-3.18-1.32H3v18h7.51c1.41 0 2.79.4 3.99 1.15zm3.01-14.65-.01 14.64c1.19-.75 2.57-1.14 3.98-1.14H28.5V6H21.51c-1.19 0-2.34.47-3.18 1.32-.84.84-1.32 1.99-1.32 3.18z"/></svg>',
  download: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M9.47 4.02c.77 0 1.4.63 1.4 1.4 0 .77-.63 1.4-1.4 1.4H4.85c-.67 0-1.17.17-1.53.51-.34.34-.51.86-.51 1.55v14.24c0 .69.17 1.21.51 1.55.35.35.86.53 1.53.53h22.29c.66 0 1.16-.18 1.51-.53.36-.34.54-.86.54-1.55V7.88c0-.69-.18-1.21-.54-1.55-.35-.34-.86-.51-1.51-.51h-4.62c-.77 0-1.4-.63-1.4-1.4 0-.77.63-1.4 1.4-1.4h4.81c1.54 0 2.71.39 3.49 1.17.79.78 1.18 1.94 1.18 3.47v14.71c0 1.53-.39 2.69-1.18 3.46-.79.78-1.95 1.17-3.49 1.17H4.66c-1.54 0-2.71-.39-3.49-1.17C.38 26.95 0 25.8 0 24.27V9.55c0-1.53.39-2.69 1.18-3.47.79-.78 1.95-1.17 3.49-1.17zm6.54-4.02c.38 0 .71.14.98.41.28.27.42.59.42.95v14.25l-.12 2.25.8-.97 2.15-2.3c.25-.28.57-.42.94-.42.34 0 .64.12.88.35.25.23.38.52.38.86 0 .33-.13.64-.39.91l-4.98 4.8c-.18.17-.36.29-.53.36-.17.07-.35.11-.53.11s-.36-.04-.53-.11c-.17-.07-.35-.19-.54-.36l-4.96-4.8c-.27-.27-.41-.58-.41-.91 0-.34.12-.63.36-.86.24-.23.53-.35.88-.35.39 0 .71.14.95.42l2.16 2.3.8.97-.12-2.25V1.36c0-.36.14-.68.41-.95.28-.27.62-.41 1-.41z"/></svg>',
  plugin: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M12.4 2c2.15 0 3.9 1.75 3.9 3.9 0 .62-.15 1.2-.4 1.72h4.5c1.02 0 1.85.83 1.85 1.85v4.5c.52-.25 1.1-.4 1.72-.4 2.15 0 3.9 1.75 3.9 3.9s-1.75 3.9-3.9 3.9c-.62 0-1.2-.15-1.72-.4v4.5c0 1.02-.83 1.85-1.85 1.85h-5.28c-.68 0-1.23-.55-1.23-1.23 0-.3.1-.56.28-.83.4-.6.63-1.2.63-1.87 0-1.05-.85-1.9-1.9-1.9s-1.9.85-1.9 1.9c0 .67.23 1.27.63 1.87.18.27.28.53.28.83 0 .68-.55 1.23-1.23 1.23H6.15c-1.02 0-1.85-.83-1.85-1.85v-5.28c0-.68.55-1.23 1.23-1.23.3 0 .56.1.83.28.6.4 1.2.63 1.87.63 1.05 0 1.9-.85 1.9-1.9s-.85-1.9-1.9-1.9c-.67 0-1.27.23-1.87.63-.27.18-.53.28-.83.28-.68 0-1.23-.55-1.23-1.23V9.47c0-1.02.83-1.85 1.85-1.85h4.5c-.25-.52-.4-1.1-.4-1.72 0-2.15 1.75-3.9 3.9-3.9z"/></svg>',
  github: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 0c8.84 0 16 7.16 16 16 0 3.35-1.05 6.62-3.01 9.34-1.96 2.72-4.72 4.76-7.89 5.84-.8.16-1.1-.34-1.1-.76 0-.54.02-2.26.02-4.4 0-1.5-.5-2.46-1.08-2.96 3.56-.4 7.3-1.76 7.3-7.9 0-1.76-.62-3.18-1.64-4.3.16-.4.72-2.04-.16-4.24 0 0-1.34-.44-4.4 1.64-1.28-.36-2.64-.54-4-.54s-2.72.18-4 .54c-3.06-2.06-4.4-1.64-4.4-1.64-.88 2.2-.32 3.84-.16 4.24-1.02 1.12-1.64 2.56-1.64 4.3 0 6.12 3.72 7.5 7.28 7.9-.46.4-.88 1.1-1.02 2.14-.92.42-3.22 1.1-4.66-1.32-.3-.48-1.2-1.66-2.46-1.64-1.34.02-.54.76.02 1.06.68.38 1.46 1.8 1.64 2.26.32.9 1.36 2.62 5.38 1.88 0 1.34.02 2.6.02 2.98 0 .42-.3.9-1.1.76-3.19-1.06-5.96-3.1-7.92-5.82C1.05 22.62 0 19.35 0 16 0 7.16 7.16 0 16 0z"/></svg>',
  shield: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2 28 7v8c0 7.6-4.9 12.7-12 15C8.9 27.7 4 22.6 4 15V7l12-5zm0 3.2L7 9v6c0 5.8 3.5 9.8 9 11.9 5.5-2.1 9-6.1 9-11.9V9l-9-3.8zm-1.5 6.3h3v7h-3v-7zm0 9h3v3h-3v-3z"/></svg>',
  news: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M4 3h20v4h4v20H8v-4H4V3zm4 4v16h16V7H8zm3 3h10v3H11v-3zm0 6h10v2H11v-2zm0 4h7v2h-7v-2z"/></svg>',
  teams: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3.5c3.04 0 5.5 2.46 5.5 5.5s-2.46 5.5-5.5 5.5S10.5 12.04 10.5 9 12.96 3.5 16 3.5zM16 17c4.69 0 8.5 3.36 8.5 7.5V28h-17v-3.5c0-4.14 3.81-7.5 8.5-7.5z"/><path fill="currentColor" d="M5.75 10.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zm2.1 9.35c-1.4 1.31-2.35 3.02-2.35 5.15v3h-5.5v-3c0-2.9 2.5-5.25 5.75-5.25.72 0 1.44.04 2.1.1z"/><path fill="currentColor" d="M26.25 10.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zm-2.1 9.35c1.4 1.31 2.35 3.02 2.35 5.15v3h5.5v-3c0-2.9-2.5-5.25-5.75-5.25-.72 0-1.44.04-2.1.1z"/></svg>',
  heart: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 28.7c-.42 0-.83-.15-1.15-.43-5.15-4.45-8.6-7.7-10.5-10.55C2.45 14.87 1.6 12.32 1.6 9.77c0-2.25.76-4.15 2.25-5.65C5.35 2.62 7.25 1.85 9.5 1.85c1.32 0 2.55.3 3.65.92 1 .56 1.9 1.37 2.7 2.42.8-1.05 1.7-1.86 2.7-2.42 1.1-.62 2.33-.92 3.65-.92 2.25 0 4.15.77 5.65 2.27 1.49 1.5 2.25 3.4 2.25 5.65 0 2.55-.85 5.1-2.75 7.95-1.9 2.85-5.35 6.1-10.5 10.55-.32.28-.73.43-1.15.43z"/></svg>',
  gift: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3.2c1.5 0 2.9.5 4 1.4 1.1-.9 2.5-1.4 4-1.4 3.5 0 6.4 2.9 6.4 6.4 0 1.4-.4 2.6-1.2 3.7l-1.4 1.9h1.4c.5 0 .9.4.9.9v4.2c0 .5-.4.9-.9.9h-1v8.4c0 .5-.4.9-.9.9H4.7c-.5 0-.9-.4-.9-.9v-8.4h-1c-.5 0-.9-.4-.9-.9v-4.2c0-.5.4-.9.9-.9h1.4l-1.4-1.9c-.8-1.1-1.2-2.3-1.2-3.7 0-3.5 2.9-6.4 6.4-6.4 1.5 0 2.9.5 4 1.4 1.1-.9 2.5-1.4 4-1.4z"/></svg>',
  palette: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2.4C8.5 2.4 2.4 8.5 2.4 16S8.5 29.6 16 29.6c1.4 0 2.5-1.1 2.5-2.5 0-.65-.25-1.24-.65-1.68-.39-.44-.64-1.02-.64-1.66 0-1.38 1.12-2.5 2.5-2.5h2.95c4.06 0 7.34-3.29 7.34-7.34C29.6 7.06 23.5 2.4 16 2.4zM8.2 16.9a2.35 2.35 0 1 1 0-4.7 2.35 2.35 0 0 1 0 4.7zm4.3-5.75a2.35 2.35 0 1 1 0-4.7 2.35 2.35 0 0 1 0 4.7zm7 0a2.35 2.35 0 1 1 0-4.7 2.35 2.35 0 0 1 0 4.7zm4.3 5.75a2.35 2.35 0 1 1 0-4.7 2.35 2.35 0 0 1 0 4.7z"/></svg>',
  discord: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M20.5 3.87c-.31.56-.59 1.13-.85 1.72-2.43-.36-4.89-.36-7.33 0-.25-.59-.54-1.16-.85-1.72-2.28.39-4.5 1.07-6.61 2.04C.7 12.04-.43 18.06.13 24c2.44 1.81 5.18 3.18 8.1 4.07.66-.88 1.24-1.82 1.74-2.8-.94-.35-1.86-.79-2.73-1.3.23-.17.45-.34.67-.5 5.12 2.41 11.06 2.41 16.19 0 .22.18.44.35.67.5-.87.52-1.79.95-2.74 1.31.5.98 1.08 1.91 1.74 2.8 2.92-.88 5.65-2.25 8.1-4.06.66-6.89-1.14-12.87-4.75-18.16-2.1-.96-4.32-1.65-6.6-2.03zM10.68 20.4c-1.58 0-2.88-1.43-2.88-3.2 0-1.77 1.26-3.2 2.88-3.2 1.62 0 2.91 1.44 2.88 3.2-.03 1.76-1.27 3.2-2.88 3.2zm10.63 0c-1.58 0-2.88-1.43-2.88-3.2 0-1.77 1.26-3.2 2.88-3.2 1.62 0 2.9 1.44 2.88 3.2-.03 1.76-1.27 3.2-2.88 3.2z"/></svg>',
  calendar: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M10 2c.83 0 1.5.67 1.5 1.5V5h9V3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V5H26.5C28.43 5 30 6.57 30 8.5v18c0 1.93-1.57 3.5-3.5 3.5h-21C3.57 30 2 28.43 2 26.5v-18C2 6.57 3.57 5 5.5 5H8V3.5C8 2.67 8.67 2 10 2zM27 13H5v13.5c0 .28.22.5.5.5h21c.28 0 .5-.22.5-.5z"/></svg>',
  desktop: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M28.46 2c1.1 0 1.97.31 2.59.93.63.62.95 1.49.95 2.61v15.92c0 1.11-.31 1.98-.93 2.61-.63.62-1.5.93-2.61.93h-7.84v2.42h1.07c.36 0 .66.12.91.37.25.25.37.56.37.92 0 .35-.12.65-.37.91-.25.25-.55.38-.91.38H9.25c-.36 0-.67-.13-.92-.38-.25-.25-.37-.56-.37-.91 0-.36.12-.67.37-.92.25-.25.56-.37.92-.37h1.07v-2.42H2.54c-1.1 0-1.97-.31-2.59-.93C-.67 23.44-1 22.57-1 21.46V5.54c0-1.11.31-1.98.93-2.61C.56 2.31 1.43 2 2.54 2zm-24.76 2.72c-.29 0-.53.09-.71.27-.18.17-.27.41-.27.72v15.58c0 .31.09.55.27.72.18.18.42.27.71.27h24.6c.29 0 .53-.09.71-.27.18-.17.27-.41.27-.72V5.71c0-.31-.09-.55-.27-.72-.18-.18-.42-.27-.71-.27z"/></svg>',
  shirt: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M9.82 29.23c-1.13 0-1.97-.28-2.53-.83-.55-.54-.83-1.37-.85-2.49l-.15-11.93-2.99.68c-.57.12-1.03.07-1.4-.16-.36-.23-.6-.63-.74-1.22L.08 8.97c-.15-.58-.11-1.06.1-1.46.22-.41.6-.72 1.15-.96l8.55-3.65c.24-.11.48-.15.7-.15.23 0 .45.05.68.16.53.25 1.04.46 1.53.63.49.17 1 .3 1.51.39.52.09 1.08.13 1.69.13.6 0 1.15-.04 1.66-.13.52-.09 1.02-.22 1.51-.39.49-.17 1.01-.38 1.54-.63.23-.11.45-.16.68-.16.23 0 .46.04.7.15l8.55 3.65c.56.23.94.55 1.15.96.21.4.24.88.1 1.46l-1.08 4.31c-.14.58-.39.99-.75 1.22-.36.23-.82.28-1.39.16l-2.98-.68-.16 11.93c-.02 1.12-.3 1.95-.86 2.49-.55.55-1.39.83-2.52.83z"/></svg>',
  learn: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3 2 9l14 6 12-5.14V21h2V9zm0 14.21L5.91 13 4 13.81v5.69C4 23.38 9.07 27 16 27s12-3.62 12-7.5v-5.69l-2-1L16 17.21z"/></svg>',
  style: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2C9.37 2 4 7.37 4 14c0 5.52 3.74 10.16 8.8 11.55.4.11.7-.17.7-.48v-1.7c-3.58.78-4.33-1.54-4.33-1.54-.37-.93-.9-1.18-.9-1.18-.74-.5.06-.49.06-.49.82.06 1.25.84 1.25.84.72 1.24 1.9.88 2.36.67.07-.52.28-.88.51-1.08-2.86-.33-5.87-1.43-5.87-6.37 0-1.41.5-2.56 1.32-3.46-.13-.33-.57-1.64.13-3.41 0 0 1.08-.35 3.54 1.32a12.3 12.3 0 0 1 6.44 0c2.46-1.67 3.54-1.32 3.54-1.32.7 1.77.26 3.08.13 3.41.82.9 1.32 2.05 1.32 3.46 0 4.95-3.02 6.04-5.89 6.36.29.25.55.75.55 1.51v2.24c0 .31.3.6.71.5C24.27 24.15 28 19.51 28 14 28 7.37 22.63 2 16 2z"/></svg>',
  community: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm8 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 26v-1.5C4 20.91 7.58 18 12 18c.85 0 1.67.12 2.44.34A7.46 7.46 0 0 0 12 24.5V26zm14 0v-1.5a5.5 5.5 0 0 1 5.5-5.5c3.04 0 5.5 2.46 5.5 5.5V26z"/></svg>',
  install: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2a2 2 0 0 1 2 2v12.17l3.59-3.58a2 2 0 1 1 2.82 2.82l-7 7a2 2 0 0 1-2.82 0l-7-7a2 2 0 1 1 2.82-2.82L14 16.17V4a2 2 0 0 1 2-2zM4 24a2 2 0 0 1 2-2h20a2 2 0 1 1 0 4H6a2 2 0 0 1-2-2z"/></svg>',
  about: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 6.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM13.5 14h5v10h-2v-8h-3v-2z"/></svg>',
  video: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M4 7h16a2 2 0 0 1 2 2v2.38l5.12-3.2A1.5 1.5 0 0 1 29.5 9.5v13a1.5 1.5 0 0 1-2.38 1.32L22 20.62V23a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/></svg>',
  theme: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3c7.18 0 13 5.82 13 13S23.18 29 16 29a3 3 0 0 1 0-6 7 7 0 1 0-6.07-10.5A3 3 0 0 1 7 15c0-6.63 4.03-12 9-12zm-6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>',
};

const TREE = {
  id: 'root',
  label: 'Omarchy',
  children: [
    {
      id: 'learn',
      label: 'Learn',
      icon: 'learn',
      description: 'docs & media',
      children: [
        { id: 'learn.manual', label: 'Manual', icon: 'book', href: '/manual/', description: 'the handbook', keywords: 'docs documentation guide' },
        { id: 'learn.themes', label: 'Themes', icon: 'theme', href: '/themes/', description: '145+ looks', keywords: 'style colors wallpaper' },
        { id: 'learn.videos', label: 'Videos', icon: 'video', href: '/videos/', description: 'tours & reviews', keywords: 'youtube watch tour' },
        { id: 'learn.news', label: 'News', icon: 'news', href: '/news/', description: 'changelog', keywords: 'blog updates' },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'community',
      description: 'people',
      children: [
        { id: 'community.discord', label: 'Discord', icon: 'discord', href: 'https://discord.gg/tXFUdasqhY', description: 'chat', keywords: 'talk help' },
        { id: 'community.meetups', label: 'Meetups', icon: 'calendar', href: '/meetups/', description: 'in person' },
        { id: 'community.teams', label: 'Teams', icon: 'teams', href: '/teams/', description: 'core & friends' },
        { id: 'community.patrons', label: 'Patrons', icon: 'heart', href: '/patrons/', description: 'supporters' },
        { id: 'community.sponsorships', label: 'Sponsorships', icon: 'gift', href: '/sponsorships/', description: 'fund the work' },
        { id: 'community.air', label: 'Artists in Residence', icon: 'palette', href: '/air/', description: 'AIR', keywords: 'air artist' },
      ],
    },
    {
      id: 'install',
      label: 'Install',
      icon: 'install',
      description: 'get it',
      children: [
        { id: 'install.iso', label: 'Download ISO', icon: 'download', href: 'https://iso.omarchy.org/omarchy-4.0.1.iso', description: '4.0.1', keywords: 'iso download install' },
        { id: 'install.plugins', label: 'Plugins', icon: 'plugin', href: 'https://omarchyplugins.com/', description: 'marketplace', keywords: 'extensions shell' },
        { id: 'install.workstations', label: 'Workstations', icon: 'desktop', href: '/workstations/', description: 'hardware' },
        { id: 'install.merch', label: 'Merch', icon: 'shirt', href: 'https://supply.37signals.com/collections/omarchy', description: 'supply' },
      ],
    },
    {
      id: 'about',
      label: 'About',
      icon: 'about',
      description: 'project',
      children: [
        { id: 'about.security', label: 'Security', icon: 'shield', href: '/security/', description: 'report a hole' },
        { id: 'about.github', label: 'GitHub', icon: 'github', href: 'https://github.com/omacom/omarchy', description: 'the code', keywords: 'source repo code' },
      ],
    },
  ],
};

function flatten(node, trail = []) {
  const rows = [];
  for (const child of node.children || []) {
    const path = [...trail, child.label];
    if (child.children) {
      rows.push(...flatten(child, path));
    } else {
      rows.push({ ...child, path });
    }
  }
  return rows;
}

const ALL_LEAVES = flatten(TREE);

function score(query, item) {
  if (!query) return 1;
  const hay = [item.label, item.description, item.keywords, ...(item.path || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  const parts = query.toLowerCase().trim().split(/\s+/);
  let total = 0;
  for (const part of parts) {
    if (!hay.includes(part)) return 0;
    total += hay.startsWith(part) ? 3 : hay.includes(` ${part}`) ? 2 : 1;
    if (item.label.toLowerCase().startsWith(part)) total += 4;
  }
  return total;
}

function createMenu() {
  const dialog = document.createElement('dialog');
  dialog.id = 'omenu';
  dialog.className = 'omenu';
  dialog.setAttribute('aria-label', 'Omarchy menu');
  dialog.innerHTML = `
    <div class="omenu__shell">
      <div class="omenu__panel" role="presentation">
        <div class="omenu__search">
          <span class="omenu__search-prompt" data-omenu-prompt aria-hidden="true">$</span>
          <input class="omenu__input" data-omenu-input type="search" role="combobox"
                 aria-autocomplete="list" aria-controls="omenu-list" aria-expanded="true"
                 placeholder="Start typing…" autocomplete="off" spellcheck="false">
          <span class="omenu__hint" data-omenu-hint>esc</span>
        </div>
        <ul class="omenu__list" id="omenu-list" role="listbox" data-omenu-list></ul>
        <div class="omenu__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> move · <kbd>↵</kbd> open · <kbd>esc</kbd> back</span>
          <span><kbd>/</kbd> menu</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(dialog);
  return dialog;
}

function ready() {
  const trigger = document.querySelector('[data-omenu-open]');
  if (!trigger) return;

  const dialog = createMenu();
  const input = dialog.querySelector('[data-omenu-input]');
  const list = dialog.querySelector('[data-omenu-list]');
  const prompt = dialog.querySelector('[data-omenu-prompt]');
  const hint = dialog.querySelector('[data-omenu-hint]');

  let stack = [TREE];
  let active = 0;
  let query = '';
  let rows = [];

  function current() {
    return stack[stack.length - 1];
  }

  function visibleRows() {
    const node = current();
    if (query && stack.length === 1) {
      return ALL_LEAVES
        .map((item) => ({ item, s: score(query, item) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s || a.item.label.localeCompare(b.item.label))
        .map((x) => x.item);
    }
    if (query) {
      return (node.children || [])
        .map((item) => ({ item, s: score(query, item) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.item);
    }
    return node.children || [];
  }

  function render() {
    rows = visibleRows();
    const node = current();
    const title = stack.length === 1 ? 'Start' : node.label;
    prompt.textContent = stack.length === 1 ? '$' : '›';
    input.placeholder = `${title}…`;
    hint.textContent = stack.length > 1 ? 'esc' : 'esc';

    if (active >= rows.length) active = Math.max(0, rows.length - 1);

    if (rows.length === 0) {
      list.innerHTML = '<li class="omenu__empty">No matches</li>';
      return;
    }

    list.innerHTML = rows.map((item, index) => {
      const isSub = Boolean(item.children);
      const tag = item.href ? 'a' : 'button';
      const href = item.href ? ` href="${item.href}"` : ' type="button"';
      const desc = query && item.path
        ? item.path.slice(0, -1).join(' › ')
        : (item.description || '');
      return `
        <li role="presentation">
          <${tag} class="omenu__item${index === active ? ' is-active' : ''}"
             role="option" id="omenu-opt-${index}" data-index="${index}"
             aria-selected="${index === active ? 'true' : 'false'}"${href}>
            <span class="omenu__icon">${ICONS[item.icon] || ICONS.about}</span>
            <span class="omenu__label">${item.label}</span>
            ${desc ? `<span class="omenu__desc">${desc}</span>` : ''}
            ${isSub ? '<span class="omenu__chevron" aria-hidden="true">›</span>' : ''}
          </${tag}>
        </li>
      `;
    }).join('');

    input.setAttribute('aria-activedescendant', rows.length ? `omenu-opt-${active}` : '');
  }

  function open() {
    stack = [TREE];
    query = '';
    active = 0;
    input.value = '';
    render();
    if (!dialog.open) dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => input.focus());
  }

  function close() {
    if (dialog.open) dialog.close();
    trigger.setAttribute('aria-expanded', 'false');
  }

  function back() {
    if (query) {
      query = '';
      input.value = '';
      active = 0;
      render();
      return;
    }
    if (stack.length > 1) {
      stack.pop();
      active = 0;
      render();
      return;
    }
    close();
  }

  function activate(item) {
    if (!item) return;
    if (item.children) {
      stack.push(item);
      query = '';
      input.value = '';
      active = 0;
      render();
      return;
    }
    if (item.href) {
      close();
      if (item.href.startsWith('http') || item.href.endsWith('.iso')) {
        window.location.href = item.href;
      } else {
        window.location.assign(item.href);
      }
    }
  }

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    if (dialog.open) close();
    else open();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.classList.contains('omenu__shell')) close();
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    back();
  });

  dialog.addEventListener('close', () => {
    trigger.setAttribute('aria-expanded', 'false');
  });

  list.addEventListener('click', (event) => {
    const row = event.target.closest('[data-index]');
    if (!row) return;
    event.preventDefault();
    activate(rows[Number(row.dataset.index)]);
  });

  list.addEventListener('mousemove', (event) => {
    const row = event.target.closest('[data-index]');
    if (!row) return;
    const index = Number(row.dataset.index);
    if (index !== active) {
      active = index;
      render();
    }
  });

  input.addEventListener('input', () => {
    query = input.value;
    active = 0;
    render();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (rows.length === 0) return;
      active = (active + 1) % rows.length;
      render();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (rows.length === 0) return;
      active = (active - 1 + rows.length) % rows.length;
      render();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      activate(rows[active]);
    } else if (event.key === 'Backspace' && !input.value && stack.length > 1) {
      event.preventDefault();
      back();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      back();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

    if (event.key === '/' && !typing && !dialog.open) {
      event.preventDefault();
      open();
      return;
    }

    if ((event.key === ' ' || event.code === 'Space') && event.shiftKey === false && !typing && !dialog.open) {
      // Space alone is too aggressive for page scroll — require Super-ish via
      // nothing. Logo + / only. Keep Space for scrolling.
    }
  });

  // Homepage: open once so the launcher replaces the chip nav as the first act.
  if (document.documentElement.classList.contains('wte-home')) {
    open();
  }
}

export { ready };
