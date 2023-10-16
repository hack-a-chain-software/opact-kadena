// plugins/toaster.ts
import MyToast from '~/components/Toast.vue'

interface ToasterOptions {
  message: string;
  title?: string;
}

export default defineNuxtPlugin(() => {
  const theme = {
    containerId: 'nt-container-bottom-right',
    containerClass: [
      'absolute',
      'inset-0',
      'pointer-events-none',
      'p-4',
      'overflow-hidden',
      'flex flex-col',
      'z-[99999999999999]',
      'items-center',
      'justify-end',
      'gap-2'
    ],
    transition: {
      enterActiveClass: 'transition duration-300 ease-out',
      enterFromClass:
        'transform translate-y-full opacity-0',
      enterToClass: 'transform translate-y-0 opacity-100',
      leaveActiveClass: 'transition duration-300 ease-in',
      leaveFromClass: 'transform translate-y-0 opacity-100',
      leaveToClass: 'transform translate-y-full opacity-0'
    },
    wrapperClass: ['pointer-events-auto', 'cursor-pointer']
  }

  const nt = createNinjaToaster({
    theme
  })

  const toaster = {
    info (options: ToasterOptions) {
      nt.show(() =>
        h(MyToast, {
          ...options,
          type: 'info'
        })
      )
    },
    close () {
      // close all toasts
      nt.clearAll()

      // or close toasts in a specific containerId
      nt.clear('nt-container-bottom-right')

      // or close toasts using a theme
      nt.clear(theme)
    }
  }

  return {
    provide: {
      toaster
    }
  }
})
