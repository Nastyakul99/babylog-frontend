import { Header, Flex } from '@vkontakte/vkui';
import { AddButton } from '../../components/AddButton';
import { DeleteButton } from '../../components/DeleteButton';

export const SettingsHeader = ({ onClickAdd, onClickDelete }) => {
    return <Header
        after={<Flex>
            <AddButton onClick={onClickAdd}></AddButton>
            <DeleteButton onClick={onClickDelete}></DeleteButton>
        </Flex>}>
    </Header>
}