import { Image, Button, Flex, Group } from "@vkontakte/vkui"
import PropTypes from "prop-types";

export const WrapEditor = ({ name, img, children, onClick }) => {
    return <Group header={name}><Flex justify="space-between">
        <Image src={img}></Image>
        {children}
        {onClick ? <Button appearance="accent" mode="primary" onClick={onClick}>
            Сохранить
        </Button> : <></>}
    </Flex>
    </Group>
}

WrapEditor.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func,
};