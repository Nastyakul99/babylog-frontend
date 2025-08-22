import { CellAvatar } from './CellAvatar';
import { GENDER } from '../api/types/types';
import { BABY_BOY, BABY_GIRL } from '../images';

export const getBabyPhoto = (baby) => {
    return baby.photo || (baby.gender === GENDER.FEMALE ? BABY_GIRL : BABY_BOY);
}

export const CellBabyAvatar = ({ baby = {}, onClick = () => { }, onClickAvatar = () => { } }) => {
    const { id, name } = { ...baby };
    const photo = getBabyPhoto(baby);
    return <CellAvatar id={id}
        photo={photo}
        name={name}
        onClick={onClick}
        onClickAvatar={onClickAvatar}>
    </CellAvatar>
}
