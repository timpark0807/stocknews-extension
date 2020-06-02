import React from "react";
import Table from "react-bootstrap/Table";
import { Articles } from "./MainPage"
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface Props {
    news: Articles;
}
export const NewsTable: React.FC<Props> = ({ news }) => {
    const renderTable = () => {
        return news.articles.map(function(article) {
            return (
                <tr>
                    <td>{article.headline}</td>
                    <td><a href={article.url}>{article.source}</a></td>
                </tr>
                )
        })
    }

    return (
        <div>
        <Link to="/">
            <Button variant="primary">Back</Button>
        </Link>

        {news.articles.length > 1 && 
            <Table style={{width: "100%"}}>
            <thead>
                <tr>
                <th style={{width: "85%"}}>Headline</th>
                <th style={{width: "15%"}}>Source</th>
                </tr>
            </thead>
            <tbody>
                {renderTable()}
            </tbody>
            </Table>
        }
        </div>

    )
}
