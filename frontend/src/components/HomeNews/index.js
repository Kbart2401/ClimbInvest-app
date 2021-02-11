import { useEffect, useState } from 'react';
import './homeNews.css'

const HomeNews = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/search/home_news')
      const data = await res.json()
      setNews(data)
    })()
  }, [])

  return (
    <>
      <div className='top-news-container-home'>
        <h2>Recent News Stories</h2>
        <ul>
          {news?.map((article, idx) => (
            <li key={idx}><a href={article.url} target='_blank' rel='noreferrer'>
              <img src={article.image} alt='news' /></a>
              <div className='article-container'>
                <div className='article-header'>{article.headline}</div>
                <div className='article-summary'>{article.summary}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomeNews;