import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {Settings} from "@mui/icons-material";
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import img2 from "App/background/assets-addItem-Black1.jpg"
import img3 from "App/background/belaia-Black2.jpg"
import img7 from "App/background/wing-white2.jpg"
import img5 from "../../../../App/background/photo-1599992836360-f88e279f8350_1_11zon_4_11zon.jpg"
import img4 from "../../../../App/background/photo-1604871000636-074fa5117945_5_11zon_5_11zon.jpg"
import img8 from "../../../../App/background/photo-1606958389024-677c4e6c5904_3_11zon_6_11zon.jpg"
import img1 from "App/background/wood-white1.jpg"
import img9 from "App/background/white-black3.jpg"
import img10 from "../../../../App/background/src.jpeg"


export default function AccordionUsage() {
    const [stateImage, setStateImage] = useState("");
    const [clearBackgroundStore, setClearBackgroundStore] = useState(false);


    useEffect(() => {
        const getStore = localStorage.getItem("background");
        const background = getStore ? `url(${getStore})` : "white"
        document.body.style.background = background;
        if (clearBackgroundStore){
            localStorage.removeItem("background")
            setClearBackgroundStore(false)
            setStateImage("")
        }
    }, [stateImage, clearBackgroundStore]);



    const onChangeImageHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLImageElement;
        if (target.tagName === 'IMG') {
            setStateImage(`url(${target.src})`);
            localStorage.setItem("background",target.src)
        }

    }

    const onClickClearLocalStorage = () =>{
        setClearBackgroundStore(true)
    }
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    disableRipple
                >
                    <Settings sx={{marginRight:"10px"}}/>
                    Settings
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Button variant="contained" onClick={onClickClearLocalStorage}>Delete Background</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    disableRipple
                >
                    <PhotoCameraBackOutlinedIcon sx={{marginRight:"10px"}}/>
                    Background
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}
                         onClick={onChangeImageHandler}>
                        <img
                            src={img1}
                            alt=""
                            width={"150px"} height={"150px"} />
                        <img
                            src={img2}
                            alt=""
                            width={"150px"} height={"150px"}/>
                        <img
                            src={img3}
                            alt="" width={"150px"}
                            height={"150px"}/>
                        <img
                            src={img4}
                            alt="" width={"150px"} height={"150px"}/>
                        <img
                            src={img5}
                            alt="" width={"150px"} height={"150px"}/>

                        <img
                            src={img7}
                            alt=""
                            width={"150px"} height={"150px"}/>
                        <img
                            src={img8}
                            alt="" width={"150px"}
                            height={"150px"}/>
                        <img
                            src={img9}
                            alt="" width={"150px"} height={"150px"}/>
                        <img
                            src={img10}
                            alt="" width={"150px"} height={"150px"}/>

                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
