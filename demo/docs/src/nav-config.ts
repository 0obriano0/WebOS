export interface NavItem {
  id: string
  label: string
}

export interface NavCategory {
  label: string
  items: NavItem[]
}

export function getNavConfig(t: (key: string) => string): NavCategory[] {
  return [
    {
      label: t('nav.gettingStarted'),
      items: [
        { id: 'overview',     label: t('nav.overview') },
        { id: 'installation', label: t('nav.installation') },
        { id: 'quick-start',  label: t('nav.quickStart') },
      ],
    },
    {
      label: t('nav.coreApi'),
      items: [
        { id: 'open-close', label: t('nav.openClose') },
        { id: 'min-max',    label: t('nav.minMax') },
        { id: 'events',     label: t('nav.events') },
      ],
    },
    {
      label: t('nav.vanillaJs'),
      items: [
        { id: 'hello-world', label: t('nav.helloWorld') },
        { id: 'dom-content', label: t('nav.domContent') },
        { id: 'jquery',      label: t('nav.jquery') },
      ],
    },
    {
      label: t('nav.vue3'),
      items: [
        { id: 'vue-composable', label: t('nav.vueComposable') },
        { id: 'vue-keepalive',  label: t('nav.vueKeepAlive') },
      ],
    },
    {
      label: t('nav.react'),
      items: [
        { id: 'react', label: t('nav.reactComposable') },
      ],
    },
  ]
}
