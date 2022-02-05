import React, {useEffect, useState} from 'react';
import './Article.css'
import {Button} from "@mui/material";
import axios from "axios";
import {useParams} from "react-router";
import {Link, useSearchParams} from "react-router-dom";
import ReadingMode from "./ReadingMode/ReadingMode";
import EditMode from "./EditMode/EditMode";

const apiUrl = process.env.REACT_APP_API_URL;

const Article = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const {id} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const edith = searchParams.get('edith')

    useEffect(async () => {
        try {
            const response = await axios.get(`${apiUrl}/article/${id}`);
            setData(response.data);
        } catch (e) {
            // throw newError(e.response.data.message);
        }
    }, [open, edith])

    return (
        <div className='article'>
            <Link to='/'>
                <Button size="large" variant="outlined">Back to articles</Button>
            </Link>
            {open || edith ? <EditMode setOpen={setOpen} data={data}/> : <ReadingMode setOpen={setOpen} data={data}/>}
        </div>
    );
};

export default Article;