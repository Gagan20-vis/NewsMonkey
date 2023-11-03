import { Component,useRef  } from "react";
import NewsItems from "./NewsItems";
import DefaultImg from "../assets/defaultImage.png";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

export default class News extends Component {
    static defaultProps = {
        country: "in",
        category: "general",
    };
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    };
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        };
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(
            this.props.category
        )}`;
    }
    async componentDidMount() {
        this.updateNews();
    }
    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8687cfd7e82a41aa8624239776464215&page=${this.state.page}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResult: parsedData.totalResults,
            loading: false,
        });
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8687cfd7e82a41aa8624239776464215&page=${this.state.page}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResult: parsedData.totalResults,
            loading: false,
        });
    };
    render() {
        return (
            <>
                <h2 className="my-4">
                    NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
                    Headlines
                </h2>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner />}
                    style={{ overflow: "hidden" }}
                >
                    <div className="container my-3">
                        <div className="row">
                            {this.state.articles.map((e, ind) => {
                                return (
                                    <div className="col-md-3" key={ind}>
                                        <NewsItems
                                            title={e.title ? e.title.slice(0, 45) : ""}
                                            description={
                                                e.description ? e.description.slice(0, 88) : ""
                                            }
                                            imageUrl={e.urlToImage ? e.urlToImage : DefaultImg}
                                            newsUrl={e.url}
                                            date={e.publishedAt}
                                            source={e.source.name}
                                            author={e.author}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}
