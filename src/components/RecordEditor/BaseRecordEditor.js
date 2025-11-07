import { WrapEditor } from "./WrapEditor";
import PropTypes from "prop-types";

export const BaseRecordEditor = ({ activity }) => {
    return <WrapEditor name={activity.name} img={activity.img}></WrapEditor>;
}

BaseRecordEditor.propTypes = {
    activity: PropTypes.object.isRequired,
};