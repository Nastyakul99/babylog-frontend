import { Icon24Settings } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from '../../routes';
import { PanelHeaderButton } from '@vkontakte/vkui';

export const SettingsButton = () => {
    const routeNavigator = useRouteNavigator();

    return <PanelHeaderButton>
        <Icon24Settings
            onClick={() => routeNavigator.push(DEFAULT_VIEW_PANELS.FAMILY)}
            width={20}
            height={20} />
    </PanelHeaderButton>
}