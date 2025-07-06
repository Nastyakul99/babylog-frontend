import { IconButton } from '@vkontakte/vkui';
import { Icon24Delete } from '@vkontakte/icons';

export const DeleteButton = ({ onClick = () => { } }) => {
    return <IconButton label="Удалить" title='Удалить' onClick={onClick}>
        <Icon24Delete color='gray' />
    </IconButton>;
}