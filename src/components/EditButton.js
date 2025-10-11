import { IconButton } from '@vkontakte/vkui';
import { Icon24Write } from '@vkontakte/icons';

export const EditButton = ({ onClick = () => { } }) => {
    return <IconButton label="Редактировать" title='Редактировать' onClick={onClick}>
        <Icon24Write color='gray' />
    </IconButton>;
}