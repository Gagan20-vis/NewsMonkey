import NewsItems from "./NewsItems";
import DefaultImg from "../assets/defaultImage.png";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    // document.title = `NewsMonkey - ${capitalizeFirstLetter(
    //     props.category
    // )}`;
    useEffect(() => {
        updateNews();
    }, [])
    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResults);
        setLoading(false);
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const fetchMoreData = async () => {
        const updatedPage = page + 1;
        setPage(updatedPage);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${updatedPage}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResult(parsedData.totalResults);
        setLoading(false);
    };
    return (
        <>
            <h2 className="my-4 container">
                NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
                Headlines
            </h2>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={loading && <Spinner />}
                style={{ overflow: "hidden" }}
            >
                <div className="container my-3">
                    <div className="row">
                        {articles.map((e, ind) => {
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
export default News;
News.defaultProps = {
    country: "in",
    category: "general",
};
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
};