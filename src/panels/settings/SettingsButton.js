import { Icon24Settings } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PanelHeaderButton } from '@vkontakte/vkui';
import { DEFAULT_VIEW_PANELS } from '../../routes';

export const SettingsButton = () => {
    const routeNavigator = useRouteNavigator();

    return <PanelHeaderButton className='SettingsButton AppButton' title="Настройки">
        <Icon24Settings
            onClick={() => routeNavigator.push("/" + DEFAULT_VIEW_PANELS.SETTINGS)}
            width={20}
            height={20} />
    </PanelHeaderButton>
}