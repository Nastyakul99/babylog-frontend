import { Image, Button, Flex, Group } from "@vkontakte/vkui"
import PropTypes from "prop-types";
import { Header } from "@vkontakte/vkui";
import "./Editor.css"
import { classNames } from "@vkontakte/vkui";

export const WrapEditor = ({ name, img, children, onClick, className }) => {
    return <Flex className={classNames("Editor", className)} justify="space-between" align="center" noWrap={true}>
                <Image src={img}></Image>
                {children}
                {onClick ? <Button className="AppButton--light"  onClick={onClick}>
                    Сохранить
                </Button> : <></>}
            </Flex>

}

WrapEditor.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func,
};