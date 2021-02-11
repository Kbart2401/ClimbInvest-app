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
        <h2>Top News Stories</h2>
        <ul>
          {news?.map((article, idx) => (
            <li key={idx}>{article.headline}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomeNews;