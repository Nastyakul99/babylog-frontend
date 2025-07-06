import { useFamily } from '../../hooks/useFamily';
import bridge from '@vkontakte/vk-bridge';
import { CellAvatar } from '../../components/CellAvatar';
import { useSelected } from '../../hooks/useSelected';
import { SettingsGroup } from './SettingsGroup';

const CellPersonAvatar = ({ user = {}, onClick = () => { } }) => {
    const { id, photo_200, first_name, last_name } = { ...user };
    return <CellAvatar id={id}
        photo={photo_200}
        name={first_name}
        lastName={last_name}
        onClick={onClick}>
    </CellAvatar>
}

export const FamilySettings = ({ person = {} }) => {
    const [family, addToFamily] = useFamily({ userId: person.vkId });
    const [selected, update] = useSelected();

    const onClickAdd = async () => {
        const response = await bridge.send('VKWebAppGetFriends');
        response.users.forEach(u => {
            addToFamily(u.id);
        });
    }

    return <SettingsGroup
        onClickAdd={onClickAdd}>
        {family.map((p) => {
            return <CellPersonAvatar onClick={(i) => { update(i) }}
                user={p.user}>
            </CellPersonAvatar>
        })}
    </SettingsGroup>
}