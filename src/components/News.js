import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    const fetchMoreData = async () => {
        setLoading(false);

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        await fetch(url)
            .then(async result => {
                const data = await result.json();
                setArticles(articles.concat(data.articles));
                setTotalResults(data.totalResults);
                setPage(page + 1);
                setLoading(false);
            })
    }

    useEffect(() => {
        setLoading(true);
        props.setProgress(15);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        fetch(url).then(async (result) => {
            props.setProgress(30);
            const data = await result.json();
            props.setProgress(70);
            setArticles(data.articles);
            setTotalResults(data.totalResults);
            setPage(page + 1);
            setLoading(false);
            props.setProgress(100);
        })
    }, [])

    return (
        <>
            <h1 className="my-4 text-center" style={{ paddingTop: "4rem" }}>NewsMonkey - Top {props.category} headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-sm-4 my-2" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                </div>)
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News
