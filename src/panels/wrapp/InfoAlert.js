import "./Wrapp.css"
import { INFO } from "../../images";
import { FixedLayout } from "@vkontakte/vkui";
import { CAlert } from "@coreui/react";
import { Image } from "@vkontakte/vkui";
import PropTypes from 'prop-types';

export const InfoAlert = ({ info }) => {
    return info && <FixedLayout vertical="bottom" filled>
        <CAlert className="InfoAlert" color="light">
            <Image size={24} src={INFO} />{info}
        </CAlert>
    </FixedLayout> || <></>;
}

InfoAlert.propTypes = {
    info: PropTypes.string,
};