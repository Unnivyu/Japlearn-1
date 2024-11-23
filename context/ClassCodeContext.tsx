import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClassCodeContext = createContext();

export const ClassCodeProvider = ({ children }) => {
    const [classCode, setClassCode] = useState('');

    useEffect(() => {
        const loadClassCode = async () => {
            const storedClassCode = await AsyncStorage.getItem('classCode');
            if (storedClassCode) {
                setClassCode(storedClassCode);
            }
        };
        loadClassCode();
    }, []);

    const saveClassCode = async (code) => {
        setClassCode(code);
        await AsyncStorage.setItem('classCode', code);
    };

    return (
        <ClassCodeContext.Provider value={{ classCode, setClassCode: saveClassCode }}>
            {children}
        </ClassCodeContext.Provider>
    );
};

export const useClassCode = () => {
    return useContext(ClassCodeContext);
};
