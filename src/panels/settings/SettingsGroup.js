import { Group } from '@vkontakte/vkui';
import { SettingsHeader } from './SettingsHeader';

export const SettingsGroup = ({ children, onClickAdd }) => {
    return <Group
        mode={"plain"}
        header={<SettingsHeader onClickAdd={onClickAdd}></SettingsHeader>}>
        {children}
    </Group>
}