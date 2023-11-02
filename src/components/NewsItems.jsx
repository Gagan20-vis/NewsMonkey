import { Component } from 'react'

export default class NewsItems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl,date,source,author} = this.props;
        return (
            <div className="card my-4" style={{ width: "18rem" }}>
                <img src={imageUrl} className="card-img-top" style={{ maxHeight: "155px" }} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Source - {source}</h6>
                    <p className="card-text">{description}...</p>
                    <p className="text-muted" style={{fontSize:"small"}}>By - {!author? "Unkown": author} on {new Date(date).toGMTString()}</p>
                    <a href={newsUrl} target='_blank' className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}
