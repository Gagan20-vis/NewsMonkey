import { Component } from 'react'

export default class NewsItems extends Component {
    
    render() {
        let {title,description,imageUrl,newsUrl} = this.props;
        return (
            <div className="card my-4" style={{width: "18rem"}}>
                <img src={imageUrl} className="card-img-top" style={{maxHeight: "155px"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank' className="btn btn-primary">Know More</a>
                    </div>
            </div>
        )
    }
}
