import "../Wrapp.css"
import { InfoAlert } from "./InfoAlert";
import { Alert } from "@vkontakte/vkui";
import { useState, useEffect, useContext } from "react";
import { ErrorContext } from "../../../contexts/ErrorContext";

export const InfoAlerts = () => {
    const { errors, setErrors } = useContext(ErrorContext);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        if (errors.length > 0) {
            setAlert(true);
        }
    }, [errors]);

    const handleClose = () => {
        setAlert(false);
        setErrors([]);
    };

    return (
        <>
            {alert && (
                <Alert
                    onClose={handleClose}
                    title="Ошибки"
                    description={
                        <>
                            {errors.map((inf) => (
                                <InfoAlert key={inf.id} inf={inf} />
                            ))}
                        </>
                    }
                />
            )}
        </>
    );
};