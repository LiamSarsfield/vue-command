import VueCommand from './components/VueCommand'
import { ARROW_UP_KEY, ARROW_DOWN_KEY, R_KEY, TAB_KEY } from '../src/constants/keys'
import { h, nextTick } from 'vue'

// Returns a Stdout component containing a span element with given inner content
export const createStdout = (content, isInnerText = false, isEscapeHtml = false, name = 'VueCommandStdout', ...mixins) => ({
  name,
  mixins,
  inject: ['terminate'],
  async mounted () {
    // Wait for user mutations
    await nextTick()

    this.terminate()
  },

  render: () => {
    if (isEscapeHtml) {
      return h('span', {}, content)
    }

    if (isInnerText) {
      return h('span', { innerText: content })
    }

    return h('span', { innerHTML: content })
  }
})

// Returns a Stderr component containing a span element with given inner content
export const createStderr = (content, isInnerText = false, isEscapeHtml = false, name = 'VueCommandStderr', ...mixins) => ({
  name,
  mixins,
  inject: ['terminate'],
  async mounted () {
    // Wait for user mutations
    await nextTick()

    this.terminate()
  },

  render: () => {
    if (isEscapeHtml) {
      return h('span', {}, content)
    }

    if (isInnerText) {
      return h('span', { innerText: content })
    }

    return h('span', { innerHTML: content })
  }
})

// Returns a dummy Stdout component to not show a Stdin
export const createDummyStdout = (name = 'VueCommandDummyStdout', ...mixins) => ({
  name,
  mixins,
  inject: ['terminate'],
  async mounted () {
    // Wait for user mutations
    await nextTick()

    this.terminate()
  },

  render: () => h('span', {}, '')
})

// Default event listeners to opt-in
export const EVENT_LISTENERS = {
  // Autocompletion when pressing "Tab" key
  autocomplete: terminal => {
    terminal.$refs['term-cont'].addEventListener('keydown', event => {
      if (event.keyCode === TAB_KEY && !terminal.local.isInProgress) {
        event.preventDefault()

        terminal.autocomplete()
      }
    })
  },

  // Cycle through history with "Arrow up key" and "Arrow down key"
  history: terminal => {
    terminal.$refs['term-cont'].addEventListener('keydown', event => {
      if (terminal.local.isInProgress) {
        return
      }

      if (event.keyCode === ARROW_UP_KEY) {
        event.preventDefault()

        terminal.decreaseHistory()
      }

      if (event.keyCode === ARROW_DOWN_KEY) {
        event.preventDefault()

        terminal.increaseHistory()
      }
    })
  },

  // Search history with "Ctrl" and "r"
  search: terminal => {
    terminal.$refs['term-cont'].addEventListener('keydown', event => {
      if (
        event.ctrlKey &&
        event.keyCode === R_KEY &&
        !terminal.local.isInProgress
      ) {
        event.preventDefault()

        terminal.setIsSearchHandler()
      }
    })
  }
}

export default VueCommand
