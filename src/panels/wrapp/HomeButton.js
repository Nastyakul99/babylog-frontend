import { Icon24Home } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PanelHeaderButton } from '@vkontakte/vkui';

export const HomeButton = () => {
    const routeNavigator = useRouteNavigator();

    return <PanelHeaderButton className="AppButton" title='Назад'>
        <Icon24Home
            onClick={() => routeNavigator.push("/")}
            width={20}
            height={20} />
    </PanelHeaderButton>
}