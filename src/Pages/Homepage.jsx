import useSWR from 'swr';
import { useState } from 'react';
import "../Styles/Homepage.css"

const fetcher = (url) => fetch(url).then((res) => res.json());

function MainContent() {
  const { data: articles, error } = useSWR('https://localhost:44338/api/article', fetcher);

  if (error) {
    console.log(error);
    return <div>Failed to load articles.</div>;
  }

  if (!articles) return <div>Loading...</div>;

  return (
    <>     
      <div className="article-list">
        {articles.map((article) => (
          <div key={article.articleId} className="article-card">
            <div className="article-header">
              <div className="article-info">
                <span className="author-name">{article.AuthorName}</span>
                <span className="publish-time">{new Date(article.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="article-content">
              <h3 className="article-title">{article.articleName}</h3>
              <p className="article-description">Last edited: {new Date(article.lastEdited).toLocaleDateString()}</p>
            </div>
            <div className="article-footer">
              <span className="comments">{article.commentCount} Comments</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MainContent;
