import { Component } from 'react'

export default class NewsItems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl,date } = this.props;
        const formattedDate = new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        return (
            <div className="card my-4" style={{ width: "18rem" }}>
                <img src={imageUrl} className="card-img-top" style={{ maxHeight: "155px" }} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Date - {formattedDate}</h6>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target='_blank' className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}
