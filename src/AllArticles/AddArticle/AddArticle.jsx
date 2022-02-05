import React, {useState} from 'react';
import {Button, Modal, TextField} from "@mui/material";
import './AddArticle.css'
import axios from "axios";
import {useNavigate} from "react-router";

const apiUrl = process.env.REACT_APP_API_URL;

const AddArticle = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({});
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleChange = e => setValue({...value, [e.target.name]: e.target.value});

    const handleClick = async () => {
        if(!value.heading || !value.content){
            alert("Please fill all fields")
            return
        }
        try {
            const response = await axios.post(`${apiUrl}/article/1`, {
                ...value
            }).then((res) => {
                navigate('/article/' + res.data.id + "?edith=true")
            });
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="add_article">
            <Button size="large" variant="contained" onClick={handleOpen}>Add Article</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='box'>
                    <div className="form_block">
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            placeholder="Title"
                            variant="outlined"
                            onChange={handleChange}
                            name='heading'
                        />
                        <TextField
                            id="outlined-multiline-static"
                            placeholder="Article content"
                            multiline
                            rows={4}
                            fullWidth
                            onChange={handleChange}
                            name='content'
                        />
                        <Button size="large" variant="contained" onClick={handleClick}>Add</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddArticle;