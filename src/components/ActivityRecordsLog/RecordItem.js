import { formatHHmmss } from "../../utils/dateUtils"
import { getTimeDiffUOM } from "../../utils/timeDiff"
import PropTypes from "prop-types";
import { Activity } from "../../api/types/types";
import { EditButton } from "../EditButton";
import { DeleteButton } from "../DeleteButton";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const RecordItem = ({ record, activity, addInf = null,
  deleteRecords = async () => { } }) => {
  const routeNavigator = useRouteNavigator();

  const start = new Date(record.startTime);

  const timeDiff = record.endTime ? `${getTimeDiffUOM(start, new Date(record.endTime))}, ` : "";

  const showModal = () => {
    routeNavigator.push(`record/${record.id}`);
  }

  const delRecord = async () => {
    await deleteRecords([record.id]);
  }

  return activity && <span className="RecordItem">{`${formatHHmmss(start)}, ${timeDiff}${activity.name}${addInf ? (", " + addInf) : ""}`}
    <span className="RecordItem__span">
      <EditButton onClick={showModal}></EditButton>
      <DeleteButton onClick={delRecord}></DeleteButton>
    </span>
  </span>
    || <></>
}

RecordItem.propTypes = {
  record: PropTypes.object.isRequired,
  activity: PropTypes.instanceOf(Activity),
  addInf: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};