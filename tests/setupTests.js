import { config } from '@vue/test-utils'


// Stub out components that cause noise or are hard to render in tests
config.global.stubs = {
    'router-link': true,
  Teleport: true,       // don't actually mount teleport targets
  Transition: false,    // render content instantly without animations
}

// Example: Provide global mocks (e.g., Vue Router's $route)
config.global.mocks = {
  $route: { path: '/', params: {} },
  $router: { push: jest.fn().mockResolvedValue() },

  $t: (msg) => msg // if you use vue-i18n
}

config.global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({})
  })

// Stub the directive so Vue stops warning
config.global.directives = {
  touch: {
    beforeMount() {},
    mounted() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
  },
}