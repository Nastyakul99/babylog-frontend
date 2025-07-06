import { IconButton } from '@vkontakte/vkui';
import { Icon24UserAdd } from '@vkontakte/icons';

export const AddButton = ({ onClick = () => { } }) => {
    return <IconButton label="Добавить" title='Добавить' onClick={onClick}>
        <Icon24UserAdd color='gray' />
    </IconButton>;
}