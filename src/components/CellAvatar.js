import { Cell, Avatar } from '@vkontakte/vkui';

export const CellAvatar = ({ id, photo, name, lastName, onClick = () => { } }) => {
    return <Cell key={id} mode="selectable"
        onClick={(e) => {
            if (e.target?.tagName === 'INPUT')
                onClick(id);
        }}
        before={photo && <Avatar src={photo} />}>
        {`${name} ${lastName}`}
    </Cell>
}