import "../Wrapp.css"
import { CAlert } from "@coreui/react";
import { Image } from "@vkontakte/vkui";
import PropTypes from 'prop-types';
import { Info } from "./Info";

export const InfoAlert = ({ inf }) => {
    return <CAlert className="InfoAlert" color="light">
        <Image size={24} src={inf.type?.img} />{inf.text}
    </CAlert>;
}

InfoAlert.propTypes = {
    info: PropTypes.objectOf(Info),
};