import { CellAvatar } from '../../components/CellAvatar';
import { useSelected } from '../../hooks/useSelected';
import { SettingsGroup } from './SettingsGroup';
import { useBabies } from '../../hooks/useBabies';
import { Baby } from '../../api/types/types';
import { GENDER } from '../../api/types/types';

const CellBabyAvatar = ({ baby = {}, onClick = () => { } }) => {
    const { id, name, gender } = { ...baby };
    const photo = gender === GENDER.FEMALE ? "https://img.icons8.com/plasticine/100/sleeping-baby-girl-.png" :
    "https://img.icons8.com/plasticine/100/child-with-pacifier.png";
    return <CellAvatar id={id}
        photo={photo}
        name={name}
        onClick={onClick}>
    </CellAvatar>
}

export const BabySettings = ({ person = {} }) => {
    const [babies, add, deleteBabies, popout] = useBabies({ userId: person.vkId });
    const [selected, update] = useSelected();

    const onClickAdd = async () => {
        const newBaby = new Baby({ name: "max", id: 0,
            birthDate: "2025-07-10",
            gender: GENDER.MALE});
        add(newBaby);
    }

    const onClickDelete = async () => {
        deleteBabies(selected)
    }

    return <SettingsGroup
        onClickAdd={onClickAdd}
        onClickDelete={onClickDelete}>
        {babies
            .map((b) => {
                return <CellBabyAvatar key={b.id} onClick={(i) => { update(i) }}
                    baby={b}>
                </CellBabyAvatar>
            })}
    </SettingsGroup>
}