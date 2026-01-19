import { useEffect } from 'react';
import { Info } from '../panels/wrapp/InfoAlert/Info';
import { ALERT_TYPES } from '../panels/wrapp/InfoAlert/AlertTypes';

const INFO_MESSAGES = {
  NO_BABIES: 'Добавьте малыша в настройках',
  NO_SELECTED_BABY: 'Выберите малыша',
};

export const useBabyValidation = (babies, selectedBaby, addError) => {
  useEffect(() => {
    if (!babies) return;

    let infoMessage = null;
    if (babies.length === 0) {
      infoMessage = INFO_MESSAGES.NO_BABIES;
    } else if (selectedBaby == null) {
      infoMessage = INFO_MESSAGES.NO_SELECTED_BABY;
    }

    if (infoMessage) {
      addError(new Info(-1, infoMessage, ALERT_TYPES.INFO));
    }
  }, [babies, selectedBaby, addError]);
};

export const useSelectedBabyCleanup = (babies, selectedBaby, setSelectedBaby) => {
  useEffect(() => {
    if (babies == null || selectedBaby == null) return;

    const babyExists = babies.some(baby => baby.id === selectedBaby.id);
    if (!babyExists) {
      setSelectedBaby(null);
    }
  }, [babies, selectedBaby, setSelectedBaby]);
};
