import React, {useEffect} from 'react';
import style from './Error.module.css'

const Error = () => {
    console.log("ERROR-LOG")
    useEffect(() => {
        console.log("ERROR-USEEFFECT")
    }, []);
    return (
        <div className={style.text}>
            PAGE NOT FOUND !!!
        </div>
    );
};

export default Error;