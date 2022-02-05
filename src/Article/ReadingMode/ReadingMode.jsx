import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router";

const apiUrl = process.env.REACT_APP_API_URL;

const ReadingMode = ({setOpen, data}) => {
    const navigate = useNavigate();

    const handleDelete = (id) => {
        axios.delete(`${apiUrl}/article/${id}`)
            .then((res) => {
                if (res.data) {
                    navigate('/')
                }
            });
    }
    const created_date = new Date(data.created_date).toLocaleString();
    const updated_at = new Date(data.updated_at).toLocaleString();

    const handleEdith = () => {
        setOpen(true)
        navigate(`/article/${data.id}?edith=true`)
    }

    return (
        <Card sx={{width: '50%', my: 5}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.heading}
                </Typography>
                <Typography variant="body2">
                    Created Date: {created_date}
                </Typography>
                {data.created_date !== data.updated_at ?
                    <Typography variant="body2">
                        Updated Date: {updated_at}
                    </Typography>
                    :
                    null
                }
                <br/>
                <Typography variant="body2" color="text.secondary" style={{overflowWrap: 'break-word'}}>
                    {data.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="success" variant="contained" onClick={handleEdith}>Edith</Button>
                <Button color="error" variant="contained" onClick={() => handleDelete(data.id)}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default ReadingMode;