import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
        country : 'in',
        category: 'general',
        pageSize: 5

    };

    static propTypes = {
        country : PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    };
  constructor() {
    super();
    console.log("hi");
    this.state = {
      articlesArray: [],
      pageNum: 1,
      totalPages: 1,
      isLoading: false,
    };
  }

  async componentDidMount() {
    console.log("hi cmd");
    let newsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbf2ccafed9f4ea8a3c96b92cf141170&page=${this.state.pageNum}&pageSize=${this.props.pageSize}`;
    this.setState({
        isLoading: true
    });
    let responseData = await fetch(newsUrl);
    let parsedData = await responseData.json();
    this.setState({
      articlesArray: parsedData.articles,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pageSize),
      isLoading: false,
    });
  }

  handlePrev = async () => {
    console.log("prev");
    let newsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbf2ccafed9f4ea8a3c96b92cf141170&page=${
      this.state.pageNum - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
        isLoading: true
    });
    let responseData = await fetch(newsUrl);
    let parsedData = await responseData.json();
    this.setState({
      articlesArray: parsedData.articles,
      pageNum: this.state.pageNum - 1,
      isLoading: false,
    });
  };

  handleNext = async () => {
    if (this.state.totalPages >= this.state.pageNum + 1) {
      console.log("next");
      let newsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbf2ccafed9f4ea8a3c96b92cf141170&page=${
        this.state.pageNum + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({
        isLoading: true
    });
      let responseData = await fetch(newsUrl);
      let parsedData = await responseData.json();
      this.setState({
        articlesArray: parsedData.articles,
        pageNum: this.state.pageNum + 1,
        isLoading: false,
      });
    } else {
      console.log("umm news over");
    }
  };

  render() {
    console.log("hi render");
    return (
      <div className="container my-4">
        {this.state.isLoading && <Spinner></Spinner>}
        <div className="row my-3">
          {!(this.state.isLoading) && this.state.articlesArray.map((ele) => {
            return (
              <div className="col-md-4 my-2" key={ele.newsUrl}>
                <NewsItem
                  title={ele.title ? ele.title.slice(0, 55) : " "}
                  description={
                    ele.description ? ele.description.slice(0, 40) : " "
                  }
                  imgUrl={ele.urlToImage}
                  newsUrl={ele.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button disabled={this.state.pageNum<=1?true:false} type="button" className="btn btn-dark" onClick={this.handlePrev}>
            &larr;Previous
          </button>
          <button disabled={this.state.totalPages < this.state.pageNum + 1} type="button" className="btn btn-dark" onClick={this.handleNext}>
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
