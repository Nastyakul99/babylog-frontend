import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  createModal,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  SETTINGS: 'settings',
  ACTIVITIES: 'activities',
  CHARTS: 'charts'
};

export const MODALS = {
  EDIT_BABY_MODAL: "edit_baby_modal",
  EDIT_RECORD: "edit_record_modal"
}

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', [
        createModal(MODALS.EDIT_RECORD,
          `/record/:recordId`, ['recordId']),
      ]),
      createPanel(DEFAULT_VIEW_PANELS.ACTIVITIES, '/:groupId', [
        createModal(MODALS.EDIT_RECORD,
          `/:groupId/record/:recordId`, ['recordId']),
      ]),
      createPanel(DEFAULT_VIEW_PANELS.SETTINGS, `/${DEFAULT_VIEW_PANELS.SETTINGS}`, [
        createModal(MODALS.EDIT_BABY_MODAL,
          `/${DEFAULT_VIEW_PANELS.SETTINGS}/baby/modal/:id`, ['id']),
      ]),
      createPanel(DEFAULT_VIEW_PANELS.CHARTS, '/charts', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
