import type { NavData } from './types'

export const NAV_DATA: NavData[] = [
  {
    title: '学习案例',
    items: [
      {
        icon: '/NavIcons/前端探险号.ico',
        title: '前端探险号',
        badge: {
          text: '加油',
          type: 'info',
        },
        desc: '学习前端写的小案例都在这里聚集',
        link: 'https://example.pgup.me'
      },
    ]
  },
]