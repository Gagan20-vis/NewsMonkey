import { Component } from "react";
import NewsItems from "./NewsItems";
import DefaultImg from "../assets/defaultImage.png";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
    }
    async componentDidMount() {
        this.updateNews();
    }
    async updateNews() {
        let url =
            `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8687cfd7e82a41aa8624239776464215&page=${this.state.page}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResult: parsedData.totalResults,
            loading: false
        });
    }
    handPrevClick = async () => {
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    };
    handNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        });
        this.updateNews();
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <div className="container my-3">
                <h2 className="my-4">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                <div className="row">
                    {!this.state.loading && this.state.articles ? (
                        this.state.articles.map((e) => {
                            return (
                                <div className="col-md-3" key={e.url}>
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
                        })
                    ) : (
                        <Spinner />
                    )}
                </div>
                <div className="d-flex justify-content-around my-4">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        onClick={this.handPrevClick}
                        className="btn btn-dark"
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={
                            this.state.page + 1 > Math.ceil(this.state.totalResult / 20)
                        }
                        type="button"
                        id="nextbtn"
                        onClick={this.handNextClick}
                        className="btn btn-dark"
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}
