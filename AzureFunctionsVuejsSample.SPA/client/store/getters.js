const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => state.menu.items
const menuexpand = state => state.menu.expand
const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}
const env = state => state.env
const authme = state => state.authme

export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  menuitems,
  menuexpand,
  componententry,
  env,
  authme
}
