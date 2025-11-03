import { Icon20GraphOutline } from '@vkontakte/icons';
import { PanelHeaderButton } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from '../routes';

export const ChartButton = ({ }) => {
    const routeNavigator = useRouteNavigator();
    return <PanelHeaderButton className='AppButton'
        title="Статистика" onClick={() => routeNavigator.push("/" + DEFAULT_VIEW_PANELS.CHARTS)}>
        <Icon20GraphOutline />
    </PanelHeaderButton>;
}