import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import './AllArticles.css'
import axios from "axios";
import {Link} from "react-router-dom";
import AddArticle from "./AddArticle/AddArticle";

const apiUrl = process.env.REACT_APP_API_URL;

const AllArticles = () => {
    const [data, setData] = useState([]);

    useEffect(async () => {
        try {
            const response = await axios.get(`${apiUrl}/articles`);
            setData(response.data);
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className='all_articles'>
            <AddArticle/>
            {data &&
                <div className='articles'>
                    {data
                        .sort((a, b) => b.id - a.id)
                        .map((item) => {
                            return (
                                <Card sx={{width: 262, my: 3, mr: 3}} key={item.id}>
                                    <CardContent>
                                        <Link to={'/article/' + item.id}>
                                            <Typography variant="h5" component="div">
                                                {item.heading}
                                            </Typography>
                                        </Link>
                                        <Typography variant="body2">
                                            {new Date(item.created_date).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )
                        })}
                </div>
            }
            {data.length == 0 && <h1>No articles</h1>}
        </div>
    );
};

export default AllArticles;