import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    // begin of props in class based components
    let {
        title,
        description,
        imgUrl,
        newsUrl
    } = this.props;
    // end of props
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>   
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
              Explore More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
