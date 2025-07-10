import { Group } from '@vkontakte/vkui';
import { SettingsHeader } from './SettingsHeader';

export const SettingsGroup = ({ children, onClickAdd, onClickDelete }) => {
    return <Group
        mode={"plain"}
        header={<SettingsHeader onClickAdd={onClickAdd}
            onClickDelete={onClickDelete}>
        </SettingsHeader>}>
        {children}
    </Group>
}