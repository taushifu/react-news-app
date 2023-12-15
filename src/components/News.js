import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    fetchMoreData = async () => {
        this.setState({ loading: true, });

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        await fetch(url)
            .then(async result => {
                const data = await result.json();
                this.setState({
                    articles: this.state.articles.concat(data.articles),
                    totalResults: data.totalResults,
                    page: this.state.page + 1,
                    loading: false,
                });
                console.log(data);
                console.log("total result " + this.state.totalResults);
            })
    }


    async componentDidMount() {
        this.setState({ loading: true, });
        this.props.setProgress(15);

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        await fetch(url)
            .then(async result => {
                this.props.setProgress(30);
                const data = await result.json();
                this.props.setProgress(70);
                this.setState({
                    articles: data.articles,
                    totalResults: data.totalResults,
                    page: this.state.page + 1,
                    loading: false,
                });
                console.log(data);
                console.log("total result " + this.state.totalResults);
                this.props.setProgress(100);
            })
    }


    render() {
        return (
            <>
                <h1 className="my-4 text-center">NewsMonkey - Top {this.props.category} headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
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
}
