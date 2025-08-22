import { CellAvatar } from '../../components/CellAvatar';
import { useSelected } from '../../hooks/useSelected';
import { SettingsGroup } from './SettingsGroup';
import { useBabies } from '../../hooks/useBabies';
import { Baby } from '../../api/types/types';
import { GENDER } from '../../api/types/types';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const CellBabyAvatar = ({ baby = {}, onClick = () => { }, onClickAvatar = () => { } }) => {
    const { id, name, gender } = { ...baby };
    const photo = gender === GENDER.FEMALE ? "https://img.icons8.com/plasticine/100/sleeping-baby-girl-.png" :
        "https://img.icons8.com/plasticine/100/child-with-pacifier.png";
    return <CellAvatar id={id}
        photo={photo}
        name={name}
        onClick={onClick}
        onClickAvatar={onClickAvatar}>
    </CellAvatar>
}

export const BabySettings = ({ babies = [], deleteBabies = async() => { } }) => {
    //const [babies, add, deleteBabies, getBaby, , popout] = useBabies({ userId: person.vkId });
    const [selected, update] = useSelected();
    const routeNavigator = useRouteNavigator();

    const newBaby = new Baby({
        name: "max", id: 0,
        birthDate: "2025-07-10",
        gender: GENDER.MALE
    });

    const onClickAdd = async () => {
        showModal(null);
    }

    const onClickDelete = async () => {
        deleteBabies(selected)
    }

    const showModal = (id) => {
        //routeNavigator.showModal(MODALS.EDIT_BABY_MODAL, { state: { id: id } })
        routeNavigator.push(`baby/modal/${id}`);
    }

    return <SettingsGroup
        onClickAdd={onClickAdd}
        onClickDelete={onClickDelete}>
        {
            //babies
            [newBaby]
                .map((b) => {
                    return <CellBabyAvatar key={b.id}
                        onClick={(i) => { update(i) }}
                        onClickAvatar={() => { showModal(b.id) }}
                        baby={b}>
                    </CellBabyAvatar>
                })}
    </SettingsGroup>
}