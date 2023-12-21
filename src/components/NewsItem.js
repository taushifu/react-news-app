import React from 'react'
import ImgNotFound from '../assets/file-not-found.jpg'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, publishedAt, } = props;
    return (
        <div>
            <div className="card" style={{ height: "27rem" }}>
                <img src={(() => {
                    if (imageUrl === null) return ImgNotFound;
                    else return imageUrl;
                })()} className="card-img-top" alt="..." style={{ height: "13rem" }} />

                <div className="card-body">

                    <h5 className="card-title">
                        {title.length > 60 ? title.slice(0, 60) + "..." : title}
                    </h5>

                    <p className="card-text" >
                        {(() => { //Using IIFE (Immediately Invoked Function Expression)
                            if (description !== null) {
                                if (description.length > 70) return description.slice(0, 70) + "...";
                                else return description;
                            }
                            else return "*NO DESCRIPTION AVAILABLE*"
                        })()}
                    </p>

                    <p className="card-text">
                        <small className="text-body-secondary" >
                            By {author ? author : "Unknown"} at {new Date(publishedAt).toGMTString()}
                        </small>
                    </p>

                    <a href={newsUrl} target="_blank" rel=" noopener noreferrer" className="btn btn-sm btn-dark">
                        Read More
                    </a>

                </div>
            </div>
        </div>
    )
}
export default NewsItem
