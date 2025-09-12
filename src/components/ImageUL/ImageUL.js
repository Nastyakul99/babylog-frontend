import "./ImageUL.css"
import PropTypes from "prop-types";

export const ImageUL = ({ list = [], img = "" }) => {
    return <ul className="ImageUL">
        {list.map((l) => {
            const background = l.img || img;
            const style = (background) ? { '--imageUL-background': `url('${background}'` } : {};
            return <li className="ImageUL__li" key={l.id}
                style={style}>
                {l.data}
            </li>
        }
        )}
    </ul >
}

ImageUL.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            img: PropTypes.string,
            data: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        })
    ),
    img: PropTypes.string,
};