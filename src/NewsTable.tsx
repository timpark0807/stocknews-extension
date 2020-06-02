import React from "react";
import Table from "react-bootstrap/Table";

export interface Article {
    headline: string;
    source: string;
    url: string;
}

export interface Articles {
    ticker: string;
    articles: Article[];
}

export const NewsTable: React.FC<Articles> = ({ticker, articles}) => {
    const renderTable = () => {
        return articles.map(function(article) {
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
        </div>
    )
}
