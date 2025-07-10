import { Icon24ArrowLeftOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { PanelHeaderButton } from '@vkontakte/vkui';

export const BackButton = () => {
    const routeNavigator = useRouteNavigator();

    return <PanelHeaderButton title='Назад'>
        <Icon24ArrowLeftOutline
            onClick={() => routeNavigator.back()}
            width={20}
            height={20} />
    </PanelHeaderButton>
}