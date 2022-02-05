import React, {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router";

const apiUrl = process.env.REACT_APP_API_URL;

const EditMode = ({setOpen, data}) => {
    const [value, setValue] = useState({heading: data.heading, content: data.content});
    const navigate = useNavigate();
    const handleChange = e => setValue({...value, [e.target.name]: e.target.value});

    const handleSave = (id) => {
        axios.put(`${apiUrl}/article/${id}`, {...value})
        setOpen(false)
        navigate('/article/' + data.id)
    }

    useEffect(()=>{
        setValue({heading: data.heading, content: data.content})
    },[data])

    return (
        <Card sx={{width: '50%', my: 5}}>
            <CardContent>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    placeholder="Title"
                    variant="outlined"
                    onChange={handleChange}
                    name='heading'
                    value={value.heading}
                />
                <TextField
                    id="outlined-multiline-static"
                    placeholder="Article content"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={handleChange}
                    name='content'
                    value={value.content}
                    sx={{my: 2}}
                />
            </CardContent>
            <CardActions>
                <Button color="success" variant="contained" onClick={() => handleSave(data.id)}>Save</Button>
            </CardActions>
        </Card>
    );
};

export default EditMode;