import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import hrmsRouter from './hrms/'
import mlmsRouter from './mlms/'
import gpmsRouter from './gpms/'
import imsRouter from './ims/'
import componentsRouter from './components/'
import welRouter from './wel/'
import crmsRouter from './crms/'
import appRouter from './app/'
import cpmsRouter from './cpms/'
import famsRouter from './fams/'
import exceptionRouter from './exception/'
import AvueRouter from './avue-router'
import Store from '../store/'

const Router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      const scrollPosition = {
        x: 0, y: from.meta.savedPosition || 0,
      }
      document.documentElement.scrollTop = scrollPosition.y
      return scrollPosition
    }
  },
  routes: [].concat([]),
})
AvueRouter.install(Router, Store)
// console.log('AvueRouter', Store.state.user.menu)
Router.$avueRouter.formatRoutes(Store.state.menu.menu, true)
Router.addRoutes([
  ...hrmsRouter,
  ...imsRouter,
  ...componentsRouter,
  ...mlmsRouter,
  ...welRouter,
  ...gpmsRouter,
  ...crmsRouter,
  ...appRouter,
  ...cpmsRouter,
  ...famsRouter,
  ...exceptionRouter,
  ...ViewsRouter,
  ...PageRouter,
])
export default Router
